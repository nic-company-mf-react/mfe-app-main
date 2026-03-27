import { createAppRouter } from './app-common-router.ts';
import routes from '@/shared/router';
import { registerWindowRouter } from '@nic/mfe-lib-shared/utils';

const router = createAppRouter(routes, {
	// .env 파일에 설정된 VITE_ROUTER_BASENAME 값을 사용합니다.
	basename: import.meta.env.VITE_ROUTER_BASENAME,
});

// host 앱이 window.$router를 등록 (모든 remote 앱이 공유)
registerWindowRouter(router);

export * from './app-common-router.ts';
export default router;
