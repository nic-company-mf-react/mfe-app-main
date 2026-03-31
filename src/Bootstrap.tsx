import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { type QueryClientConfig } from '@tanstack/react-query';
import { AppProviders } from '@nic/mfe-lib-shared/components';
import { initApiConfig } from '@nic/mfe-lib-shared/api';
import './assets/styles/app.css';
import App from './App.tsx';

import { i18n } from '@nic/mfe-lib-shared/i18n';
import LanguageDetector from 'i18next-browser-languagedetector';
import { AuthBackend } from './i18n/AuthBackend';

// 번들 내장 폴백 번역 — 토큰 없음/서버 장애 시 사용 (src/ 내부 import → JS 번들에 포함)
import koCommon from './i18n/locales/ko/common.json';
import koMain from './i18n/locales/ko/main-index.json';
import enCommon from './i18n/locales/en/common.json';
import enMain from './i18n/locales/en/main-index.json';

// host 앱에서만 사용되는 queryConfig
const queryConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			retry: 0, // 실패 시 재시도 횟수
			refetchOnWindowFocus: true, // 윈도우 포커스 시 자동 refetch 비활성화
			refetchOnReconnect: true, // 재연결 시 자동 refetch
			staleTime: 0, //5 * 60 * 1000, // 5분 (데이터가 fresh한 상태로 유지되는 시간)
			gcTime: 0, // 30분 (garbage collection time, 이전 cacheTime) 애플리케이션 세션유지시간과 맞춰도 될듯.
		},
		mutations: {
			retry: 0, // mutation은 재시도하지 않음
		},
	},
};

// host 앱에서 REST API 호출용 API 설정(전역에 저장된 : window.__MF_APP_CONFIG__)
const apiConfig = {
	baseURL: import.meta.env.VITE_EXTERNAL_API_BASE_URL2,
};
initApiConfig(apiConfig);

//createRoot(document.getElementById('root')!).render(
//	<StrictMode>
//		<AppProviders queryConfig={queryConfig}>
//			<App />
//		</AppProviders>
//	</StrictMode>,
//);

// 액세스 토큰 getter — 실제 프로젝트의 auth 스토어(zustand, redux 등)와 연결
// 현재는 localStorage 기준 예시
const getToken = (): string | null => {
	return localStorage.getItem('access_token');
};

i18n
	.use(AuthBackend) // 인증 기반 서버 번역 로딩
	.use(LanguageDetector) // 브라우저 언어 자동 감지
	.init({
		// 번들 내장(resources) + 서버 로딩(backend) 동시 사용 허용하는 핵심 옵션
		partialBundledLanguages: true,
		// 번들 내장 폴백: 서버 응답 전 / 장애 시 사용
		resources: {
			ko: { common: koCommon, main: koMain },
			en: { common: enCommon, main: enMain },
		},
		ns: ['common', 'main'],
		defaultNS: 'common',
		fallbackLng: 'ko',
		interpolation: {
			escapeValue: false, // React는 XSS를 자체 처리하므로 불필요
		},
		// AuthBackend에 전달되는 옵션
		backend: {
			loadPath: '/api/i18n/translations?lng={{lng}}&ns={{ns}}',
			getToken,
			cacheTTL: 5 * 60 * 1000, // 5분
		},
		// LanguageDetector 옵션
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupLocalStorage: 'i18n_language', // localStorage 키명
		},
	})
	.then(() => {
		// i18n 초기화 완료 후 렌더링 — 첫 화면부터 번역 텍스트 정상 표시 보장
		createRoot(document.getElementById('root')!).render(
			<StrictMode>
				<AppProviders queryConfig={queryConfig}>
					<App />
				</AppProviders>
			</StrictMode>,
		);
	});
