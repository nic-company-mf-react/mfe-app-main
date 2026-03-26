import { Suspense, lazy } from 'react';
import RemoteOfflineFallback from '@/shared/components/common/RemoteOfflineFallback';

const Remote1AppLazy = lazy(() =>
	import('remote1App/Remote1App').catch(() => ({
		default: () => <RemoteOfflineFallback appName="Remote1" />,
	})),
);

export const Remote1App = () => (
	<Suspense fallback={<div>Loading Remote1...</div>}>
		<Remote1AppLazy />
	</Suspense>
);
