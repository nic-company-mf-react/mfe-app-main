/**
 * i18n.config.ts — i18next 초기화(init) 옵션 정책 설정
 *
 * 역할:
 *   i18next의 init() 에 전달되는 모든 옵션을 한 곳에서 정의합니다.
 *   Bootstrap.tsx나 setup.ts는 이 파일을 가져다 쓰기만 하며,
 *   정책 변경 시 이 파일만 수정합니다.
 *
 * 주요 옵션:
 *   partialBundledLanguages — 번들 내장 리소스(resources)와 서버 로딩(backend)을
 *                             동시에 사용할 수 있도록 허용하는 핵심 옵션
 *   resources               — 번들에 포함된 폴백 번역 데이터 ("서버 장애 시 쓸 비상용 번역 데이터")
 *                             (토큰 없음 / 서버 장애 시 이 데이터를 사용)
 *                             resources.ts에서 import.meta.glob으로 자동 수집 (수동 관리 불필요)
 *   ns / defaultNS          — 네임스페이스 목록 및 기본 NS (namespaces.ts 에서 관리)( "i18next야, 이 이름의 네임스페이스들을 서버에서 불러와라")
 *   fallbackLng             — 감지된 언어에 번역이 없을 때 사용할 기본 언어
 *   interpolation           — 번역 문자열 내 변수 처리 옵션
 *                             (escapeValue: false → React가 XSS를 자체 처리하므로 중복 이스케이프 불필요)
 *   backend                 — AuthBackend(인증 기반 서버 번역 로딩) 옵션
 *                             loadPath: .env의 VITE_I18N_LOAD_PATH 값 사용 (환경별 번역 서버 분리)
 *                             cacheTTL: 서버에서 받은 번역 데이터의 메모리 캐시 유지 시간(ms)
 *                             getToken: 액세스 토큰 getter — setup.ts에서 주입 (auth에 의존하지 않음)
 *   detection               — 언어 자동 감지 정책 (detection.config.ts 에서 관리)
 *
 * 환경변수 (.env):
 *   VITE_I18N_LOAD_PATH        — 로그인 후 번역 API 경로 템플릿 ({{lng}}, {{ns}} 치환자 사용)
 *   VITE_I18N_PUBLIC_LOAD_PATH — 로그인 전 정적 JSON 경로 템플릿 (public/locales/ 서빙 경로)
 *                                미설정 시 기본값: /locales/{{lng}}/{{ns}}.json
 *   VITE_I18N_CACHE_TTL        — 번역 캐시 유지 시간(ms), 미설정 시 기본값 5분
 *   VITE_I18N_FALLBACK_LNG     — 폴백 언어 코드, 미설정 시 'ko'
 */

import type { InitOptions } from 'i18next';
import { NAMESPACES, DEFAULT_NS, FALLBACK_LNG } from './namespaces';
import { detectionConfig } from './detection.config';
import { resources } from './resources';

export const i18nConfig: InitOptions = {
	partialBundledLanguages: true,
	load: 'languageOnly', // ← "ko-KR" → "ko" 로 자동 변환
	resources,
	ns: [...NAMESPACES],
	defaultNS: DEFAULT_NS,
	fallbackLng: FALLBACK_LNG,
	interpolation: {
		escapeValue: false,
	},
	backend: {
		loadPath: import.meta.env.VITE_I18N_LOAD_PATH ?? '/api/i18n/translations?lng={{lng}}&ns={{ns}}',
		publicLoadPath: import.meta.env.VITE_I18N_PUBLIC_LOAD_PATH ?? '/locales/{{lng}}/{{ns}}.json',
		cacheTTL: Number(import.meta.env.VITE_I18N_CACHE_TTL) || 5 * 60 * 1000,
		retryCount: 1,
		// getToken은 setup.ts에서 주입 (config는 auth에 의존하지 않음)
	},
	detection: detectionConfig,
};
