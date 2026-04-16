import { useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router';

import { useClientState } from '@axiom/mfe-lib-shared/hooks';
import { ArrowRight, Database, FileJson, KeyRound, Save, Trash2 } from 'lucide-react';

import { EXAMPLE_CLIENT_STATE_KEY, type ExampleClientJsonState } from './example-client-state';

const priorityOptions: { value: ExampleClientJsonState['priority']; label: string }[] = [
	{ value: 'low', label: '낮음' },
	{ value: 'medium', label: '보통' },
	{ value: 'high', label: '높음' },
];

type DraftFields = {
	title: string;
	description: string;
	/** 스토어에 값이 없을 때는 선택 전(undefined) */
	priority: ExampleClientJsonState['priority'] | undefined;
};

const emptyDraft = (): DraftFields => ({
	title: '',
	description: '',
	priority: undefined,
});

function draftFromStored(stored: ExampleClientJsonState): DraftFields {
	return {
		title: stored.title,
		description: stored.description,
		priority: stored.priority,
	};
}

/** 저장 시에만 붙는 필드 — 미리보기 JSON에는 안내용 문자열로 표시 */
const SAVED_AT_PLACEHOLDER = '(저장 시 ISO 시각이 기록됩니다)';

/** 인라인 패키지/훅 이름 — 본문과 대비되도록 테두리·채도 있는 배경(살짝 투명) */
const CODE_CHIP_CLASS =
	'text-xs font-mono font-semibold px-2 py-0.5 rounded-md border border-amber-400/45 bg-amber-200/75 text-amber-950 shadow-sm dark:border-amber-500/40 dark:bg-amber-950/70 dark:text-amber-100';

export default function ExUseClientState1(): React.ReactNode {
	const { data, setData, reset } = useClientState<ExampleClientJsonState>(EXAMPLE_CLIENT_STATE_KEY);

	const [draft, setDraft] = useState<DraftFields>(() => (data ? draftFromStored(data) : emptyDraft()));

	useEffect(() => {
		if (data === undefined) {
			setDraft(emptyDraft());
		} else {
			setDraft(draftFromStored(data));
		}
	}, [data]);

	const draftPreviewJson = useMemo(
		() =>
			JSON.stringify(
				{
					title: draft.title,
					description: draft.description,
					priority: draft.priority ?? null,
					savedAt: SAVED_AT_PLACEHOLDER,
				},
				null,
				2,
			),
		[draft.title, draft.description, draft.priority],
	);

	const canSave = draft.priority !== undefined;

	const handleSave = (): void => {
		if (draft.priority === undefined) return;
		setData({
			title: draft.title,
			description: draft.description,
			priority: draft.priority,
			savedAt: new Date().toISOString(),
		});
	};

	const handleReset = (): void => {
		reset();
	};

	return (
		<div className="p-6 space-y-8 max-w-3xl">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20">
						<Database className="w-5 h-5 text-brand-600 dark:text-brand-400" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">useClientState — 저장</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							<code className={CODE_CHIP_CLASS}>@axiom/mfe-lib-shared</code>의{' '}
							<code className={CODE_CHIP_CLASS}>useClientState</code> 예제입니다. 훅은 키별로 클라이언트 스토어를 읽고
							쓰고 초기화하며, 저장된 데이터는 전역에서 관리되어 프로젝트 전체 어디서든 같은 키로 읽을 수 있습니다.
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							아래 입력은 화면(임시)에만 반영되며,{' '}
							<strong className="font-semibold text-gray-700 dark:text-gray-300">저장</strong> 시에만 스토어에
							반영됩니다.
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
							저장 키 (useClientState 첫 번째 인자)
						</p>
						<code className="block break-all rounded-lg bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs text-gray-800 dark:text-gray-200 font-mono border border-gray-100 dark:border-gray-800">
							{EXAMPLE_CLIENT_STATE_KEY}
						</code>
					</div>
				</div>
			</div>

			<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5 shadow-sm">
				<div className="space-y-2">
					<label
						htmlFor="ex-ucs-title"
						className="text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						제목
					</label>
					<input
						id="ex-ucs-title"
						type="text"
						value={draft.title}
						onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
						placeholder="저장 시 스토어에 기록됩니다"
						className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="ex-ucs-desc"
						className="text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						설명
					</label>
					<textarea
						id="ex-ucs-desc"
						rows={4}
						value={draft.description}
						onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
						placeholder="저장 시 스토어에 기록됩니다"
						className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-y min-h-[100px]"
					/>
				</div>

				<div className="space-y-2">
					<span className="text-sm font-medium text-gray-700 dark:text-gray-300">우선순위</span>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						저장될 JSON의 <code className="rounded bg-gray-100 px-1 py-0.5 text-[11px] dark:bg-gray-800">priority</code>{' '}
						필드입니다. 스토어에 값이 없을 때는 선택하지 않은 상태에서 시작합니다.
					</p>
					<div className="flex flex-wrap gap-2">
						{priorityOptions.map((opt) => (
							<button
								key={opt.value}
								type="button"
								onClick={() => setDraft((d) => ({ ...d, priority: opt.value }))}
								className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
									draft.priority === opt.value
										? 'bg-brand-600 text-white shadow-sm dark:bg-brand-500'
										: 'border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/50'
								}`}
							>
								{opt.label}
							</button>
						))}
					</div>
				</div>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/90 dark:bg-gray-950/50 overflow-hidden">
					<div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-white/70 dark:bg-gray-900/70">
						<FileJson className="w-4 h-4 text-gray-500 shrink-0" />
						<span className="text-xs font-medium text-gray-600 dark:text-gray-400">
							저장 예정 데이터 미리보기 (제목·설명·우선순위 반영)
						</span>
					</div>
					<pre className="p-4 text-xs text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap break-words font-mono leading-relaxed">
						{draftPreviewJson}
					</pre>
				</div>
			</div>

			<div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50 p-4">
				<p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
					스토어에 저장된 값 (저장 전에는 비어 있음)
				</p>
				{data === undefined ? (
					<p className="text-sm text-gray-600 dark:text-gray-400">아직 이 키로 저장된 데이터가 없습니다.</p>
				) : (
					<pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap break-words font-mono">
						{JSON.stringify(data, null, 2)}
					</pre>
				)}
			</div>

			<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
				<div className="flex flex-wrap items-center gap-3">
					<button
						type="button"
						onClick={handleSave}
						disabled={!canSave}
						title={canSave ? undefined : '저장하려면 우선순위를 선택하세요'}
						className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50"
					>
						<Save className="w-4 h-4" />
						저장
					</button>
					<button
						type="button"
						onClick={handleReset}
						className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
					>
						<Trash2 className="w-4 h-4" />
						초기화 (스토어 비우기)
					</button>
					<Link
						to="/example/use-client-state-2"
						className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
					>
						읽기 화면으로
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</div>
	);
}
