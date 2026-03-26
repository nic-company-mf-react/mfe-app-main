import { Suspense, lazy } from 'react';

import RemoteErrorBoundary from '@/shared/components/common/RemoteErrorBoundary';
import RemoteLoadingFallback from '@/shared/components/common/RemoteLoadingFallback';
import RemoteOfflineFallback from '@/shared/components/common/RemoteOfflineFallback';

const Remote1AppLazy = lazy(() =>
	import('remote1App/Remote1App').catch(() => ({
		default: () => <RemoteOfflineFallback appName="Remote1" />,
	})),
);

export const Remote1App = () => (
	// Remote1App을 lazy로 적용하는 방법---------------------------------
	//<Suspense fallback={<div>Loading Remote1...</div>}>
	//	<Remote1AppLazy />
	//</Suspense>
	// Remote1App을 lazy로 적용하는 방법---------------------------------
	<RemoteErrorBoundary fallback={<RemoteOfflineFallback appName="Remote1" />}>
		<Suspense fallback={<RemoteLoadingFallback appName="Remote1" />}>
			<Remote1AppLazy />
		</Suspense>
	</RemoteErrorBoundary>
);
