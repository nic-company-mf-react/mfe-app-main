import type { BackendModule, ReadCallback } from 'i18next';

export interface AuthBackendOptions {
	// 번역 API 경로 템플릿, {{lng}}/{{ns}} 치환자 사용
	loadPath: string;
	// 현재 액세스 토큰을 반환하는 함수 — Bootstrap에서 실제 auth 스토어와 연결
	getToken: () => string | null;
	// 메모리 캐시 유지 시간(ms), 기본 5분
	cacheTTL?: number;
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
		getToken: () => null,
		cacheTTL: DEFAULT_CACHE_TTL,
	};

	// 인스턴스별 캐시: MF singleton이므로 실질적으로 앱 전체에서 하나
	private cache = new Map<string, CacheEntry>();

	init(_services: unknown, backendOptions: AuthBackendOptions): void {
		this.opts = { ...this.opts, ...backendOptions };
	}

	read(language: string, namespace: string, callback: ReadCallback): void {
		const { loadPath, getToken, cacheTTL = DEFAULT_CACHE_TTL } = this.opts;
		const cacheKey = `${language}:${namespace}`;
		const cached = this.cache.get(cacheKey);

		// 유효한 캐시가 있으면 서버 요청 없이 즉시 반환
		if (cached && Date.now() < cached.expiredAt) {
			callback(null, cached.data);
			return;
		}

		const token = getToken();

		// 토큰이 없으면 번들 폴백 사용 (로그인 전 상태)
		if (!token) {
			console.warn('[AuthBackend] No token found in localStorage - falling back to bundle');
			callback(new Error('[AuthBackend] No token - using bundle fallback'), false);
			return;
		}

		const url = loadPath
			.replace('{{lng}}', encodeURIComponent(language))
			.replace('{{ns}}', encodeURIComponent(namespace));

		// 요청 URL 확인
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
