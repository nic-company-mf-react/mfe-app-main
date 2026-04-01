/**
 * resources.ts — 번들 내장 폴백 번역 리소스 자동 수집
 *
 * 역할:
 *   Vite의 import.meta.glob을 사용해 src/i18n/locales/ 하위의 모든 JSON 파일을
 *   빌드 시점에 자동으로 스캔하고, i18next의 resources 형태로 변환합니다.
 *   ({ [언어코드]: { [네임스페이스]: 번역데이터 } })
 *
 *   번역 파일을 추가하거나 삭제할 때 이 파일을 수정할 필요가 없습니다.
 *   locales/ 폴더에 JSON 파일을 추가/삭제하면 빌드 시 자동으로 반영됩니다.
 *
 * 파일 명명 규칙 (반드시 준수):
 *   src/i18n/locales/{언어코드}/{네임스페이스}.json
 *   예) src/i18n/locales/ko/common.json  → resources['ko']['common']
 *       src/i18n/locales/en/main.json    → resources['en']['main']
 *
 * 주의:
 *   파일명(확장자 제외)이 곧 i18next 네임스페이스 키가 됩니다.
 *   namespaces.ts의 NAMESPACES 배열 값과 파일명을 반드시 일치시켜야 합니다.
 *
 * 새 번역 파일 추가 방법:
 *   1. 번역 파일 생성
 *      src/i18n/locales/ko/{네임스페이스}.json
 *      src/i18n/locales/en/{네임스페이스}.json
 *   2. namespaces.ts의 NAMESPACES 배열에 해당 네임스페이스 이름 추가
 *   → 이 파일(resources.ts)은 수정 불필요
 */

import type { Resource } from 'i18next';

const modules = import.meta.glob('../locales/**/*.json', { eager: true });

const resources: Resource = {};

for (const [path, module] of Object.entries(modules)) {
	const match = path.match(/\/locales\/([^/]+)\/(.+)\.json$/);
	if (!match) continue;
	const [, lng, ns] = match;
	resources[lng] ??= {};
	resources[lng][ns] = (module as { default: Record<string, string> }).default;
}

export { resources };
