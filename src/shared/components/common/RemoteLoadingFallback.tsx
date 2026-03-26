interface RemoteLoadingFallbackProps {
  appName?: string;
}

export default function RemoteLoadingFallback({ appName }: RemoteLoadingFallbackProps) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white px-12 py-10 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {/* Spinner */}
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-500 dark:border-t-brand-400" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-base font-semibold text-gray-800 dark:text-white">
            {appName ? `${appName} 불러오는 중...` : '앱을 불러오는 중...'}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            잠시만 기다려 주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
