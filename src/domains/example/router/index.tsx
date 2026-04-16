import type { TAppRoute } from '@axiom/mfe-lib-shared/types';

// @company/mf-main 앱 페이지 가져오기
import ExUseClientState1 from '../pages/use-client-state/ExUseClientState1';
import ExUseClientState2 from '../pages/use-client-state/ExUseClientState2';
import ExUseApi from '../pages/use-api/ExUseApi';

const routes: TAppRoute[] = [
	{
		path: '/example/use-client-state-1',
		element: <ExUseClientState1 />,
		name: 'ExUseClientState1',
	},
	{
		path: '/example/use-client-state-2',
		element: <ExUseClientState2 />,
		name: 'ExUseClientState2',
	},
	{
		path: '/example/use-api',
		element: <ExUseApi />,
		name: 'ExUseApi',
	},
];

export default routes;
