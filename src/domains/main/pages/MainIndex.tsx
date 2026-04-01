import { Link } from 'react-router';

import { useTranslation } from 'react-i18next';

import {
	Layers,
	CheckCircle,
	XCircle,
	Clock,
	Activity,
	Server,
	Cpu,
	Network,
	ArrowRight,
	AlertTriangle,
} from 'lucide-react';

type RemoteApp = {
	id: number;
	name: string;
	description: string;
	status: 'connected' | 'disconnected' | 'pending';
	version: string;
	url: string;
	entryPath: string;
	mainPath?: string;
	tags: string[];
};

const remoteApps: RemoteApp[] = [
	{
		id: 1,
		name: 'Remote App 1',
		description: '첫 번째 마이크로 프론트엔드 앱입니다. 핵심 비즈니스 기능을 담당합니다.',
		status: 'connected',
		version: 'v1.0.0',
		url: 'http://localhost:5174',
		entryPath: '/remote1Entry.js',
		mainPath: '/remote1/main',
		tags: ['React', 'MFE', 'Module Federation'],
	},
	{
		id: 2,
		name: 'Remote App 2',
		description: '두 번째 마이크로 프론트엔드 앱입니다. 관리자 기능을 담당합니다.',
		status: 'disconnected',
		version: 'v1.0.0',
		url: 'http://localhost:5175',
		entryPath: '/remote2Entry.js',
		tags: ['React', 'MFE', 'Admin'],
	},
	{
		id: 3,
		name: 'Remote App 3',
		description: '세 번째 마이크로 프론트엔드 앱입니다. 분석 및 리포팅 기능을 담당합니다.',
		status: 'pending',
		version: 'v0.9.0',
		url: 'http://localhost:5176',
		entryPath: '/remote3Entry.js',
		tags: ['React', 'MFE', 'Analytics'],
	},
];

const statusConfig = {
	connected: {
		label: '연결됨',
		icon: CheckCircle,
		badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
		dotClass: 'bg-green-500',
		cardBorderClass: 'border-green-200 dark:border-green-800',
	},
	disconnected: {
		label: '연결 끊김',
		icon: XCircle,
		badgeClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
		dotClass: 'bg-red-500',
		cardBorderClass: 'border-red-200 dark:border-red-800',
	},
	pending: {
		label: '대기 중',
		icon: Clock,
		badgeClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
		dotClass: 'bg-yellow-500',
		cardBorderClass: 'border-yellow-200 dark:border-yellow-800',
	},
};

const connectedCount = remoteApps.filter((app) => app.status === 'connected').length;
const disconnectedCount = remoteApps.filter((app) => app.status === 'disconnected').length;
const pendingCount = remoteApps.filter((app) => app.status === 'pending').length;

export default function MainIndex(): React.ReactNode {
	const { t } = useTranslation('main');

	return (
		<div className="p-6 space-y-8">
			{/* 헤더 섹션 */}
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20">
						<Network className="w-5 h-5 text-brand-600 dark:text-brand-400" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
							Micro-Frontend 호스트(Host) {t('nav.dashboard')}
						</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Multi MFE React v1 &mdash; 전체 리모트 앱 현황 및 연결 상태를 확인합니다.
						</p>
					</div>
				</div>
			</div>

			{/* 요약 통계 카드 */}
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
				<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 flex items-center gap-4">
					<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20">
						<Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
					</div>
					<div>
						<p className="text-sm text-gray-500 dark:text-gray-400">전체 앱</p>
						<p className="text-2xl font-bold text-gray-900 dark:text-white">{remoteApps.length}</p>
					</div>
				</div>

				<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 flex items-center gap-4">
					<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20">
						<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
					</div>
					<div>
						<p className="text-sm text-gray-500 dark:text-gray-400">연결됨</p>
						<p className="text-2xl font-bold text-green-600 dark:text-green-400">{connectedCount}</p>
					</div>
				</div>

				<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 flex items-center gap-4">
					<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-50 dark:bg-yellow-900/20">
						<Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
					</div>
					<div>
						<p className="text-sm text-gray-500 dark:text-gray-400">대기 중</p>
						<p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</p>
					</div>
				</div>

				<div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 flex items-center gap-4">
					<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20">
						<AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
					</div>
					<div>
						<p className="text-sm text-gray-500 dark:text-gray-400">연결 끊김</p>
						<p className="text-2xl font-bold text-red-600 dark:text-red-400">{disconnectedCount}</p>
					</div>
				</div>
			</div>

			{/* 리모트 앱 연결 현황 */}
			<div>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
						<Activity className="w-5 h-5 text-brand-500" />
						리모트 앱 연결 현황
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
					{remoteApps.map((app) => {
						const config = statusConfig[app.status];
						const StatusIcon = config.icon;

						return (
							<div
								key={app.id}
								className={`rounded-2xl border bg-white dark:bg-gray-900 p-5 flex flex-col gap-4 transition-shadow hover:shadow-lg ${config.cardBorderClass}`}
							>
								{/* 카드 헤더 */}
								<div className="flex items-start justify-between">
									<div className="flex items-center gap-3">
										<div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20">
											<Layers className="w-5 h-5 text-brand-600 dark:text-brand-400" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900 dark:text-white text-sm">{app.name}</h3>
											<span className="text-xs text-gray-400 dark:text-gray-500">{app.version}</span>
										</div>
									</div>

									{/* 상태 배지 */}
									<span
										className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.badgeClass}`}
									>
										<span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
										{config.label}
									</span>
								</div>

								{/* 설명 */}
								<p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{app.description}</p>

								{/* 연결 정보 */}
								<div className="space-y-2 rounded-xl bg-gray-50 dark:bg-gray-950 p-3">
									<div className="flex items-center gap-2">
										<Cpu className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
										<span className="text-xs text-gray-500 dark:text-gray-400 truncate">
											{app.url}
											{app.entryPath}
										</span>
									</div>
								</div>

								{/* 태그 */}
								<div className="flex flex-wrap gap-1.5">
									{app.tags.map((tag) => (
										<span
											key={tag}
											className="px-2 py-0.5 text-xs rounded-md bg-gray-100 text-gray-600 dark:bg-gray-950 dark:text-gray-400 dark:border dark:border-gray-700"
										>
											{tag}
										</span>
									))}
								</div>

								{/* 액션 버튼 */}
								<div className="mt-auto pt-1">
									{app.status === 'connected' && app.mainPath ? (
										<Link
											to={app.mainPath}
											className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors"
										>
											앱으로 이동
											<ArrowRight className="w-4 h-4" />
										</Link>
									) : (
										<button
											disabled
											className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 text-sm font-medium cursor-not-allowed"
										>
											<StatusIcon className="w-4 h-4" />
											{app.status === 'pending' ? '준비 중' : '연결 불가'}
										</button>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* 시스템 아키텍처 안내 */}
			<div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
					<Server className="w-5 h-5 text-brand-500" />
					시스템 구성 안내
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="flex flex-col gap-2">
						<div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
							Host 앱
						</div>
						<div className="flex items-center gap-3 p-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800">
							<Network className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
							<div>
								<p className="text-sm font-medium text-brand-700 dark:text-brand-300">mfe-app-main</p>
								<p className="text-xs text-brand-500 dark:text-brand-400">http://localhost:5173</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
							Module Federation 방식
						</div>
						<div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-700">
							<Layers className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
							<div>
								<p className="text-sm font-medium text-gray-700 dark:text-gray-300">@module-federation/vite</p>
								<p className="text-xs text-gray-400 dark:text-gray-500">Multirepo 방식 &mdash; 독립적 배포</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
							공유 의존성
						</div>
						<div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-700">
							<Cpu className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
							<div>
								<p className="text-sm font-medium text-gray-700 dark:text-gray-300">React 19 / React Router 7</p>
								<p className="text-xs text-gray-400 dark:text-gray-500">singleton 공유 &mdash; 중복 로드 방지</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
