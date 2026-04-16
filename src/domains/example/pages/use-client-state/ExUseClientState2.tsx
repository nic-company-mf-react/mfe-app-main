import { useState } from 'react';

import { Link } from 'react-router';

import { useClientState } from '@axiom/mfe-lib-shared/hooks';
import { ArrowLeft, Download, Eye, FileJson, KeyRound } from 'lucide-react';

import { EXAMPLE_CLIENT_STATE_KEY, type ExampleClientJsonState } from './example-client-state';

const priorityLabel: Record<ExampleClientJsonState['priority'], string> = {
	low: '낮음',
	medium: '보통',
	high: '높음',
};

function formatSavedAt(iso: string): string {
	try {
		return new Intl.DateTimeFormat('ko-KR', {
			dateStyle: 'medium',
			timeStyle: 'medium',
		}).format(new Date(iso));
	} catch {
		return iso;
	}
}

export default function ExUseClientState2(): React.ReactNode {
	const { data } = useClientState<ExampleClientJsonState>(EXAMPLE_CLIENT_STATE_KEY);

	/** 버튼으로 가져오기 전까지 표시 영역을 비움 */
	const [loaded, setLoaded] = useState(false);
	const [snapshot, setSnapshot] = useState<ExampleClientJsonState | null>(null);

	const handleLoad = (): void => {
		setSnapshot(data ?? null);
		setLoaded(true);
	};

	return (
		<div className="p-6 space-y-8 max-w-3xl">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20">
						<Eye className="w-5 h-5 text-brand-600 dark:text-brand-400" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">useClientState — 읽기</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							아래에서 같은 키로 저장된 값을 확인합니다. 데이터 영역은{' '}
							<strong className="font-semibold text-gray-700 dark:text-gray-300">가져오기</strong>를 누른 뒤에만
							채워집니다.
						</p>
					</div>
				</div>
			</div>

			<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
				<div className="flex items-start gap-3">
					<div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0">
						<KeyRound className="w-4 h-4 text-gray-600 dark:text-gray-400" />
					</div>
					<div className="min-w-0 space-y-1">
						<p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
							조회 키 (저장 화면과 동일해야 함)
						</p>
						<code className="block break-all rounded-lg bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs text-gray-800 dark:text-gray-200 font-mono border border-gray-100 dark:border-gray-800">
							{EXAMPLE_CLIENT_STATE_KEY}
						</code>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<button
					type="button"
					onClick={handleLoad}
					className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
				>
					<Download className="w-4 h-4" />
					스토어에서 가져오기
				</button>
				<Link
					to="/example/use-client-state-1"
					className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
				>
					<ArrowLeft className="w-4 h-4" />
					저장 화면으로
				</Link>
			</div>

			{!loaded ? (
				<div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-900/30 min-h-[200px] flex flex-col items-center justify-center gap-2 p-8 text-center">
					<p className="text-sm text-gray-500 dark:text-gray-400">
						데이터 표시 영역입니다. 아직 불러오지 않았습니다.
					</p>
					<p className="text-xs text-gray-400 dark:text-gray-500">
						「스토어에서 가져오기」를 누르면 이 자리에 내용이 나타납니다.
					</p>
				</div>
			) : snapshot === null ? (
				<div className="rounded-2xl border border-yellow-200 dark:border-yellow-800/60 bg-yellow-50/80 dark:bg-yellow-950/20 p-6">
					<p className="text-sm text-yellow-900 dark:text-yellow-200">
						이 키로 저장된 데이터가 없습니다. 저장 화면에서 저장한 뒤 다시 가져오기를 눌러 보세요.
					</p>
					<Link
						to="/example/use-client-state-1"
						className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
					>
						저장 화면으로 이동
					</Link>
				</div>
			) : (
				<>
					<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4 shadow-sm">
						<dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
									제목
								</dt>
								<dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{snapshot.title}</dd>
							</div>
							<div>
								<dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
									우선순위
								</dt>
								<dd className="mt-1">
									<span className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-sm font-medium text-gray-800 dark:text-gray-200">
										{priorityLabel[snapshot.priority]}
									</span>
								</dd>
							</div>
							<div className="sm:col-span-2">
								<dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
									설명
								</dt>
								<dd className="mt-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
									{snapshot.description}
								</dd>
							</div>
							<div className="sm:col-span-2">
								<dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
									저장 시각
								</dt>
								<dd className="mt-1 text-sm text-gray-600 dark:text-gray-400 tabular-nums">
									{formatSavedAt(snapshot.savedAt)}
								</dd>
							</div>
						</dl>
					</div>

					<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 overflow-hidden">
						<div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 px-4 py-3 bg-white/80 dark:bg-gray-900/80">
							<FileJson className="w-4 h-4 text-gray-500" />
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">가져온 시점의 원본 JSON</span>
						</div>
						<pre className="p-4 text-xs text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap break-words font-mono leading-relaxed">
							{JSON.stringify(snapshot, null, 2)}
						</pre>
					</div>
				</>
			)}
		</div>
	);
}
