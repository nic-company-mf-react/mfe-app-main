// i18n 초기화 로직

import { i18n } from '@nic/mfe-lib-shared/i18n';
import LanguageDetector from 'i18next-browser-languagedetector';
import { AuthBackend, type AuthBackendOptions } from './AuthBackend';
import { i18nConfig } from './config/i18n.config';
import { AUTH_NAMESPACES, GUEST_NAMESPACES } from './config/namespaces';
// getToken은 auth 스토어 교체가 가능하도록 주입받음 (DI 패턴)
export function setupI18n(getToken: () => string | null): Promise<typeof i18n> {
	return i18n
		.use(AuthBackend)
		.use(LanguageDetector)
		.init({
			...i18nConfig,
			backend: {
				...i18nConfig.backend,
				getToken, // 실제 토큰 getter 주입
			},
		})
		.then(async () => {
			console.info(
				`[i18n] ✅ Initialized (bundle) — language: ${i18n.language}, ` +
					`namespaces: [${i18n.options.ns}], ` +
					`publicLoadPath: ${(i18nConfig.backend as AuthBackendOptions).publicLoadPath}`,
			);
			// i18next는 번들(resources)에 이미 있는 NS는 backend를 호출하지 않음.
			// GUEST_NAMESPACES를 명시적으로 재로드하여 public/locales 우선 적용 (선택지 B).
			// public/locales fetch 실패 시 AuthBackend가 callback(err, false)를 반환하고
			// i18next는 기존 번들 번역을 그대로 유지하므로 안전함.
			console.info(`[i18n] 🔄 Reloading guest namespaces from public/locales: [${GUEST_NAMESPACES.join(', ')}]`);
			await i18n.reloadResources(undefined, [...GUEST_NAMESPACES]);
			console.info(`[i18n] ✅ Guest namespaces reload complete: [${GUEST_NAMESPACES.join(', ')}]`);
			return i18n;
		});
}

/**
 * 게스트 화면 번역을 public/locales에서 강제로 다시 로드합니다.
 * setupI18n() 내부에서 이미 초기 로드를 수행하므로 일반적으로 수동 호출은 불필요합니다.
 * 운영 중 public/locales 파일을 교체하고 즉시 반영하고 싶을 때 사용하세요.
 * (i18n.loadNamespaces 대신 reloadResources를 사용해야 backend가 실제로 호출됨)
 */
export async function prefetchGuestTranslations(): Promise<void> {
	await i18n.reloadResources(undefined, [...GUEST_NAMESPACES]);
}

/**
 * 로그인 성공 직후 호출 — 서버에서 인증 전용 번역 데이터를 로드합니다.
 * AuthBackend 캐시를 먼저 무효화하여 반드시 서버에서 최신 데이터를 가져옵니다.
 */
export async function reloadI18nAfterLogin(): Promise<void> {
	const backend = i18n.services?.backendConnector?.backend as AuthBackend | undefined;
	backend?.invalidateCache();

	// 전체 재로드 → AUTH_NAMESPACES 만 재로드로 범위를 좁힘
	// i18n.reloadResources()                               ← 기존: common + main 전부 요청
	await i18n.reloadResources(undefined, [...AUTH_NAMESPACES]); // ← 개선: main 만 요청
}

/**
 * 로그아웃 직후 호출 — AuthBackend 캐시를 비워 다음 게스트/사용자 세션을 준비합니다.
 */
export function invalidateI18nOnLogout(): void {
	const backend = i18n.services?.backendConnector?.backend as AuthBackend | undefined;
	// 전체 캐시 삭제 대신 AUTH NS만 선택적으로 무효화
	AUTH_NAMESPACES.forEach((ns) => {
		backend?.invalidateCache(i18n.language, ns); // 'main' 캐시만 삭제
	});
	// → 'common' 캐시는 유지됨 (다음 게스트 세션에서도 재사용 가능)
}
