import { useState } from 'react';

import { Button } from '@axiom/mfe-lib-shared/components';
import { Check, Copy, MousePointerClick, Send, Sparkles, Trash2 } from 'lucide-react';

/** 인라인 패키지/컴포넌트 이름 — 본문과 대비되도록 테두리·채도 있는 배경(살짝 투명) */
const CODE_CHIP_CLASS =
	'text-xs font-mono font-semibold px-2 py-0.5 rounded-md border border-amber-400/45 bg-amber-200/75 text-amber-950 shadow-sm dark:border-amber-500/40 dark:bg-amber-950/70 dark:text-amber-100';

const cardClass =
	'rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 sm:p-6 shadow-sm';

export default function ExButton(): React.ReactNode {
	const [clickCount, setClickCount] = useState(0);

	return (
		<div className="p-4 sm:p-6 space-y-6 sm:space-y-8 w-full min-w-0 max-w-full">
			{/* 헤더 — MainIndex / ExUseApi 패턴 */}
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
					<div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 shrink-0">
						<MousePointerClick className="w-5 h-5 text-brand-600 dark:text-brand-400" />
					</div>
					<div className="min-w-0">
						<h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Button — 공유 UI</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
							<code className={CODE_CHIP_CLASS}>@axiom/mfe-lib-shared</code>의{' '}
							<code className={CODE_CHIP_CLASS}>Button</code> 컴포넌트 예제입니다. shadcn 스타일 토큰(
							<code className={CODE_CHIP_CLASS}>primary</code>, <code className={CODE_CHIP_CLASS}>muted</code> 등)과
							variant·size 조합을 그대로 사용합니다.
						</p>
					</div>
				</div>
			</div>

			{/* variant */}
			<section className="space-y-3 sm:space-y-4">
				<h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
					<Sparkles className="w-5 h-5 text-brand-500 shrink-0" />
					variant
				</h2>
				<div className={cardClass}>
					<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
						주요·보조·위험 행동 등 용도에 맞는 시각적 강조를 선택합니다.
					</p>
					<div className="flex flex-col gap-3 sm:gap-4">
						<div className="flex flex-wrap gap-2 sm:gap-3">
							<Button
								type="button"
								variant="default"
							>
								Primary
							</Button>
							<Button
								type="button"
								variant="secondary"
							>
								Secondary
							</Button>
							<Button
								type="button"
								variant="outline"
							>
								Outline
							</Button>
							<Button
								type="button"
								variant="ghost"
							>
								Ghost
							</Button>
							<Button
								type="button"
								variant="destructive"
							>
								<Trash2 className="size-4" />
								Destructive
							</Button>
							<Button
								type="button"
								variant="link"
							>
								Link 스타일
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* size + 반응형 그리드 */}
			<section className="space-y-3 sm:space-y-4">
				<h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
					<Send className="w-5 h-5 text-brand-500 shrink-0" />
					size
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-5">
					<div className={cardClass}>
						<p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
							텍스트 버튼
						</p>
						<div className="flex flex-wrap items-center gap-2 sm:gap-3">
							<Button
								type="button"
								size="xs"
							>
								xs
							</Button>
							<Button
								type="button"
								size="sm"
							>
								sm
							</Button>
							<Button
								type="button"
								size="default"
							>
								default
							</Button>
							<Button
								type="button"
								size="lg"
							>
								lg
							</Button>
						</div>
					</div>
					<div className={cardClass}>
						<p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
							아이콘 전용 (정사각형)
						</p>
						<div className="flex flex-wrap items-center gap-2 sm:gap-3">
							<Button
								type="button"
								size="icon-xs"
								variant="outline"
								aria-label="복사 (아주 작음)"
							>
								<Copy className="size-3" />
							</Button>
							<Button
								type="button"
								size="icon-sm"
								variant="secondary"
								aria-label="복사 (작음)"
							>
								<Copy className="size-3.5" />
							</Button>
							<Button
								type="button"
								size="icon"
								variant="default"
								aria-label="복사 (기본)"
							>
								<Copy className="size-4" />
							</Button>
							<Button
								type="button"
								size="icon-lg"
								variant="outline"
								aria-label="복사 (큼)"
							>
								<Copy className="size-4" />
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* 상태 + 인터랙션 */}
			<section className="space-y-3 sm:space-y-4">
				<h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
					<Check className="w-5 h-5 text-brand-500 shrink-0" />
					상태 · 인터랙션
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
					<div className={`${cardClass} flex flex-col gap-4`}>
						<div>
							<p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
								disabled
							</p>
							<div className="flex flex-wrap gap-2">
								<Button
									type="button"
									disabled
								>
									비활성
								</Button>
								<Button
									type="button"
									variant="outline"
									disabled
								>
									Outline 비활성
								</Button>
							</div>
						</div>
					</div>
					<div className={`${cardClass} lg:col-span-2`}>
						<p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
							클릭 카운트
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
							지금까지 <span className="font-semibold text-gray-900 dark:text-white">{clickCount}</span>번 클릭했습니다.
						</p>
						<div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
							<Button
								type="button"
								onClick={() => setClickCount((c) => c + 1)}
							>
								클릭 +1
							</Button>
							<Button
								type="button"
								variant="secondary"
								onClick={() => setClickCount(0)}
							>
								초기화
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* 넓은 화면에서 한 줄 액션 바 — 좁으면 줄바꿈 */}
			<section className="space-y-3 sm:space-y-4">
				<h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">반응형 액션 바</h2>
				<div className={cardClass}>
					<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
						컨테이너가 좁아지면 버튼이 자동으로 줄바꿈되며, 모바일에서는 세로 스택에 가깝게 배치됩니다.
					</p>
					<div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 sm:items-center sm:justify-between w-full">
						<div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-2 w-full sm:w-auto min-w-0">
							<Button
								type="button"
								variant="outline"
								className="w-full sm:w-auto min-w-0"
							>
								취소
							</Button>
							<Button
								type="button"
								variant="secondary"
								className="w-full sm:w-auto min-w-0"
							>
								임시 저장
							</Button>
						</div>
						<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:justify-end">
							<Button
								type="button"
								className="w-full sm:w-auto"
							>
								확인
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
