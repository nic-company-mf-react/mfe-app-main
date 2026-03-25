import type { TAppRoute } from '@nic/mfe-lib-shared/types';

// @company/mf-main 앱 페이지 가져오기
import MainIndex from '../pages/MainIndex';

const routes: TAppRoute[] = [
	{
		path: '/',
		element: <MainIndex />,
		name: 'MainIndex',
	},
];

export default routes;
