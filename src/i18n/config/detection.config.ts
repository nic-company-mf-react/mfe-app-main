/**
 * detection.config.ts — i18next 언어 자동 감지(LanguageDetector) 정책 설정
 *
 * 역할:
 *   사용자가 언어를 직접 선택하지 않았을 때, 브라우저/저장소 등 여러 출처에서
 *   표시할 언어를 자동으로 결정하는 방법을 정의합니다.
 *   언어 감지 정책이 변경될 경우 Bootstrap.tsx를 수정하지 않고 이 파일만 수정합니다.
 *
 * 주요 옵션:
 *   order        — 언어를 감지할 출처의 우선순위 목록
 *                  (예: ['localStorage', 'navigator'] → localStorage 우선, 없으면 브라우저 언어 사용)
 *   caches       — 감지한 언어를 저장할 위치 (다음 방문 시 재사용)
 *   lookupLocalStorage — localStorage에서 사용할 키 이름
 *                        (브라우저 개발자도구 > Application > Local Storage > 'i18n_language' 로 확인 가능)
 *
 * 동작 흐름:
 *   앱 시작 → localStorage['i18n_language'] 확인
 *           → 있으면 해당 언어 사용
 *           → 없으면 navigator.language(브라우저 설정 언어) 사용
 *           → 결정된 언어를 localStorage에 저장
 *
 *   사용자가 언어 선택 시 i18n.changeLanguage('en') 호출
 *   → localStorage['i18n_language'] = 'en' 으로 자동 저장
 *
 * 감지 가능한 출처 전체 목록 (미사용 항목은 참고용):
 *   localStorage   — 브라우저 로컬 스토리지 (현재 사용)
 *   navigator      — 브라우저 언어 설정    (현재 사용)
 *   sessionStorage — 브라우저 세션 스토리지
 *   cookie         — 쿠키 (금융권 보안 정책상 클라이언트 JS 쿠키 접근 최소화 원칙으로 제외)
 *   htmlTag        — <html lang="ko"> 속성
 *   querystring    — URL 쿼리 파라미터 (?lng=ko)
 *   path           — URL 경로 (/ko/...)
 *   subdomain      — 서브도메인 (ko.example.com)
 */

import type { DetectorOptions } from 'i18next-browser-languagedetector';

// 금융권 기준: localStorage 우선, 쿠키는 보안정책상 제외
export const detectionConfig: DetectorOptions = {
	order: ['localStorage', 'navigator'],
	caches: ['localStorage'],
	lookupLocalStorage: 'i18n_language',
};
