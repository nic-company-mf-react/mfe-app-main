import { ServerCrash } from 'lucide-react';

interface RemoteOfflineFallbackProps {
	appName?: string;
}

export default function RemoteOfflineFallback({ appName }: RemoteOfflineFallbackProps) {
	return (
		<div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center gap-6 rounded-2xl border border-red-100 bg-white px-12 py-10 shadow-lg dark:border-red-900/30 dark:bg-gray-800">
				{/* Icon */}
				<div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
					<ServerCrash
						className="h-8 w-8 text-red-500 dark:text-red-400"
						strokeWidth={1.5}
					/>
				</div>

				{/* Text */}
				<div className="flex flex-col items-center gap-2 text-center">
					<p className="text-base font-semibold text-gray-800 dark:text-white">
						{appName ? `${appName} 앱에 연결할 수 없습니다.` : '원격 앱에 연결할 수 없습니다.'}
					</p>
					<p className="max-w-xs text-sm leading-relaxed text-gray-400 dark:text-gray-500">
						해당 마이크로 프론트엔드 앱이 현재 응답하지 않습니다.
						<br />
						개발 서버가 실행 중인지 확인해 주세요.
					</p>
				</div>

				{/* Badge */}
				<span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
					<span className="h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400" />
					Offline
				</span>
			</div>
		</div>
	);
}
