// i18n 초기화 로직

import { i18n } from '@nic/mfe-lib-shared/i18n';
import LanguageDetector from 'i18next-browser-languagedetector';
import { AuthBackend } from './AuthBackend';
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
		.then(() => i18n);
}

/**
 * 로그인 전 게스트 화면에 필요한 NS만 prefetch합니다.
 * i18n.loadNamespaces()는 현재 감지된 언어를 자동으로 사용하므로 언어 파라미터 불필요.
 */
export async function prefetchGuestTranslations(): Promise<void> {
	await i18n.loadNamespaces([...GUEST_NAMESPACES]);
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
