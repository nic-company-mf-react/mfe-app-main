import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { type QueryClientConfig } from '@tanstack/react-query';
import { AppProviders } from '@nic/mfe-lib-shared/components';
import { initApiConfig } from '@nic/mfe-lib-shared/api';
import './assets/styles/app.css';
import App from './App.tsx';
import { Toaster } from '@nic/mfe-lib-shared/components/ui';

import { setupI18n } from './i18n/setup';

// host 앱에서만 사용되는 queryConfig 설정정 =================================================================
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

// host 앱에서 REST API 호출용 API 설정(전역에 저장된 : window.__MF_APP_CONFIG__) =============================
const apiConfig = {
	baseURL: import.meta.env.VITE_EXTERNAL_API_BASE_URL2,
};
initApiConfig(apiConfig);

// 다국어 지원을 위한 i18n 초기화 설정정 ======================================================================
// 액세스 토큰 getter — 실제 프로젝트의 auth 스토어(zustand, redux 등)와 연결
// 현재는 localStorage 기준 예시
const getToken = (): string | null => localStorage.getItem('access_token');
// i18n 초기화 후 렌더링(다국어 지원)
setupI18n(getToken).then(() => {
	// i18n 초기화 완료 후 렌더링 — 첫 화면부터 번역 텍스트 정상 표시 보장
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<AppProviders queryConfig={queryConfig}>
				<Toaster />
				<App />
			</AppProviders>
		</StrictMode>,
	);
});
