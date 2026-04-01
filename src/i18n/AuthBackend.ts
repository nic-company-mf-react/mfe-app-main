/**
 * @file AuthBackend.ts
 * @description i18next 커스텀 백엔드 플러그인 — 인증 토큰 기반 번역 리소스 로더
 *
 * 이 파일은 i18next의 `BackendModule` 인터페이스를 구현한 커스텀 백엔드 클래스입니다.
 * 기본 번들에 포함된 정적 번역 파일 대신, 정적 파일 또는 인증된 API 서버에서 번역 데이터를 동적으로 가져옵니다.
 *
 * 주요 동작:
 *  - 토큰 없음(로그인 전): `publicLoadPath` 경로의 정적 JSON 파일을 fetch합니다.
 *    - fetch 실패(404·네트워크 오류) 시 `retryCount` 횟수만큼 재시도합니다.
 *    - 재시도 전부 실패하면 callback(err, false) → i18next가 번들 내장 폴백을 사용합니다.
 *  - 토큰 있음(로그인 후): `loadPath` API를 Bearer 토큰과 함께 호출합니다.
 *  - 응답 데이터를 인메모리 Map에 TTL(기본 5분) 기반으로 캐싱하여 불필요한 재요청을 방지합니다.
 *  - 401 응답 시, i18next가 번들에 내장된 폴백 번역을 사용하도록 유도합니다.
 *  - `invalidateCache()` 메서드를 통해 긴급 공지·약관 변경 등의 상황에서 캐시를 즉시 무효화할 수 있습니다.
 *
 * 3단계 폴백 레이어:
 *  1단계: public/locales/*.json  — 운영 번역 파일 (빌드 없이 교체 가능)
 *  2단계: retry                  — 일시적 네트워크 장애 자동 재시도
 *  3단계: 번들 내장 JSON          — 최후 안전망 (빌드에 포함된 비상용 데이터)
 *
 * 사용처:
 *  - `src/i18n/setup.ts` 에서 i18next 플러그인으로 등록됩니다.
 *  - `Bootstrap.tsx` 에서 실제 auth 스토어의 `getToken` 함수와 연결됩니다.
 */
import type { BackendModule, ReadCallback } from 'i18next';

export interface AuthBackendOptions {
	// 로그인 후 번역 API 경로 템플릿, {{lng}}/{{ns}} 치환자 사용
	loadPath: string;
	// 로그인 전 정적 JSON 파일 경로 템플릿 (public/locales/ 서빙 경로)
	publicLoadPath: string;
	// 현재 액세스 토큰을 반환하는 함수 — Bootstrap에서 실제 auth 스토어와 연결
	getToken: () => string | null;
	// 메모리 캐시 유지 시간(ms), 기본 5분
	cacheTTL?: number;
	// publicLoadPath fetch 실패 시 재시도 횟수, 기본 1회
	retryCount?: number;
}

interface CacheEntry {
	data: Record<string, unknown>;
	expiredAt: number;
}

const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

export class AuthBackend implements BackendModule<AuthBackendOptions> {
	static type = 'backend' as const;
	type = 'backend' as const;

	private opts: AuthBackendOptions = {
		loadPath: '/api/i18n/translations?lng={{lng}}&ns={{ns}}',
		publicLoadPath: '/locales/{{lng}}/{{ns}}.json',
		getToken: () => null,
		cacheTTL: DEFAULT_CACHE_TTL,
		retryCount: 1,
	};

	// 인스턴스별 캐시: MF singleton이므로 실질적으로 앱 전체에서 하나
	private cache = new Map<string, CacheEntry>();

	init(_services: unknown, backendOptions: AuthBackendOptions): void {
		this.opts = { ...this.opts, ...backendOptions };
	}

	read(language: string, namespace: string, callback: ReadCallback): void {
		const { loadPath, publicLoadPath, getToken, cacheTTL = DEFAULT_CACHE_TTL, retryCount = 1 } = this.opts;
		const cacheKey = `${language}:${namespace}`;
		const cached = this.cache.get(cacheKey);

		// 유효한 캐시가 있으면 서버 요청 없이 즉시 반환
		if (cached && Date.now() < cached.expiredAt) {
			console.debug(`[AuthBackend] 📦 Cache hit: ${language}/${namespace}`);
			callback(null, cached.data);
			return;
		}

		const token = getToken();

		// 토큰 없음(로그인 전) → public/locales/ 정적 파일 fetch (1단계)
		if (!token) {
			const publicUrl = publicLoadPath
				.replace('{{lng}}', encodeURIComponent(language))
				.replace('{{ns}}', encodeURIComponent(namespace));

			console.debug(`[AuthBackend] No token — fetching public translations: ${publicUrl}`);

			// 실패 시 retryCount 횟수만큼 재시도 후 번들 폴백으로 위임 (2·3단계)
			const fetchWithRetry = (attemptsLeft: number): void => {
				fetch(publicUrl)
					.then(async (res) => {
						if (!res.ok) throw new Error(`[AuthBackend] HTTP ${res.status}`);
						const data = (await res.json()) as Record<string, unknown>;
						this.cache.set(cacheKey, { data, expiredAt: Date.now() + cacheTTL });
						console.log(`[AuthBackend] ✅ Loaded from public/locales: ${language}/${namespace} (${publicUrl})`);
						callback(null, data);
					})
					.catch((err: Error) => {
						if (attemptsLeft > 0) {
							console.warn(`[AuthBackend] Public fetch failed, retrying (${attemptsLeft} left): ${publicUrl}`);
							fetchWithRetry(attemptsLeft - 1);
						} else {
							// 모든 재시도 소진 → i18next가 번들 내장 폴백 사용
							console.error(
								`[AuthBackend] Public fetch failed after all retries, falling back to bundle: ${err.message}`,
							);
							callback(err, false);
						}
					});
			};

			fetchWithRetry(retryCount);
			return;
		}

		// 토큰 있음(로그인 후) → 인증 API fetch
		const url = loadPath
			.replace('{{lng}}', encodeURIComponent(language))
			.replace('{{ns}}', encodeURIComponent(namespace));

		console.debug(`[AuthBackend] Fetching translations: ${url}`);

		fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Cache-Control': 'no-cache',
			},
		})
			.then(async (res) => {
				// 401: 토큰 만료 — 번들 폴백 유지 (갱신 로직은 axios interceptor 등에서 처리)
				if (res.status === 401) {
					console.warn('[AuthBackend] 401 Unauthorized - token may be expired');
					callback(new Error('[AuthBackend] 401 Unauthorized - using bundle fallback'), false);
					return;
				}
				if (!res.ok) {
					console.error(`[AuthBackend] HTTP error ${res.status} for ${url}`);
					throw new Error(`[AuthBackend] HTTP ${res.status}`);
				}
				console.log(`[AuthBackend] Loaded translations: ${language}/${namespace}`);
				const data = (await res.json()) as Record<string, unknown>;
				this.cache.set(cacheKey, { data, expiredAt: Date.now() + cacheTTL });
				callback(null, data);
			})
			.catch((err: Error) => {
				console.error('[AuthBackend] Failed to load translations:', err.message);
				// 서버 장애, 네트워크 오류 → false 반환 시 i18next가 번들 폴백 유지
				callback(err, false);
			});
	}

	// 긴급 공지 / 약관 변경 시 외부에서 캐시 무효화 호출 가능
	invalidateCache(language?: string, namespace?: string): void {
		if (language && namespace) {
			this.cache.delete(`${language}:${namespace}`);
		} else {
			this.cache.clear();
		}
	}
}
