/**
 * namespaces.ts — i18next 네임스페이스(NS) 및 기본 언어 설정 단일 관리
 *
 * 역할:
 *   프로젝트 전체에서 사용하는 번역 네임스페이스 목록과 기본값을 한 곳에서 정의합니다.
 *   화면/도메인이 추가되어 새 NS가 필요할 경우 이 파일의 NAMESPACES 배열만 수정하면 되며,
 *   Bootstrap.tsx, setup.ts, i18n.config.ts 등 다른 파일은 변경하지 않아도 됩니다.
 *
 * 네임스페이스(NS)란?
 *   번역 파일을 기능/화면 단위로 분리하는 논리적 그룹입니다.
 *   예) 'common' → 공통 버튼/메시지, 'main' → 메인 화면 전용 번역
 *   번역 파일 위치: src/i18n/locales/{언어코드}/{NS명}.json
 *   컴포넌트에서 사용: useTranslation('common') 또는 useTranslation(['common', 'main'])
 *
 * 주요 상수:
 *   NAMESPACES   — 프로젝트에서 사용하는 NS 목록 (as const → 타입 추론 자동화)
 *   Namespace    — NAMESPACES 배열 값을 기반으로 자동 생성된 유니온 타입
 *                  (예: 'common' | 'main') — 오타 방지 및 IDE 자동완성 지원
 *   DEFAULT_NS   — useTranslation() 호출 시 NS를 명시하지 않았을 때 사용할 기본 NS
 *   FALLBACK_LNG — 감지된 언어에 번역이 없을 때 사용할 기본 언어
 *                  (.env의 VITE_I18N_FALLBACK_LNG 값 사용, 미설정 시 'ko')
 *
 * 새 화면/도메인 NS 추가 방법:
 *   1. NAMESPACES 배열에 새 NS 이름 추가     예) 'corporate'
 *   2. 해당 번역 파일 생성 (파일명 = NS명, resources.ts가 자동 인식)
 *      src/i18n/locales/ko/corporate.json
 *      src/i18n/locales/en/corporate.json
 *   → i18n.config.ts, resources.ts는 수정 불필요
 */

export const NAMESPACES = ['common', 'main'] as const;
export type Namespace = (typeof NAMESPACES)[number];
export const DEFAULT_NS: Namespace = 'common';
export const FALLBACK_LNG = import.meta.env.VITE_I18N_FALLBACK_LNG ?? 'ko';

//reloadI18nAfterLogin()에서 i18n.reloadResources() 대신 i18n.reloadResources(undefined, [...AUTH_NAMESPACES])
//형태로 범위를 좁혀 불필요한 네트워크 요청을 줄일 수 있습니다.

/** 번들에만 의존하는 게스트 화면 NS (서버 재로드 불필요) */
export const GUEST_NAMESPACES: readonly Namespace[] = ['common'] as const;

/** 로그인 후 서버에서 최신 번역을 로드해야 하는 NS 목록 */
export const AUTH_NAMESPACES: readonly Namespace[] = ['main'] as const;
