import { Layers, SquareDashedBottomCode } from 'lucide-react';

/** leaf: `path`만 사용. 하위 그룹: `subItems`가 있으면 `path`는 무시됩니다.
 * @example { name: '그룹', subItems: [{ name: '페이지', path: '/path' }] } */
export type NavSubItem = {
	name: string;
	path?: string;
	subItems?: NavSubItem[];
	pro?: boolean;
	new?: boolean;
};

export type NavItem = {
	name: string;
	icon: React.ReactNode;
	path?: string;
	subItems?: NavSubItem[];
};

export const navItems: NavItem[] = [
	{
		icon: <Layers />,
		name: 'Remote1',
		subItems: [
			{ name: 'Remote1 메인', path: '/remote1/main' },
			{ name: 'Remote1 계좌목록', path: '/remote1/example/account-page' },
			{ name: 'Remote1 데이터가져오기', path: '/remote1/example/use-api-example' },
		],
	},
	{
		icon: <SquareDashedBottomCode />,
		name: 'Example',
		subItems: [
			{
				name: 'useClientState예제',
				subItems: [
					{ name: 'useClientState1', path: '/example/use-client-state-1' },
					{ name: 'useClientState2', path: '/example/use-client-state-2' },
				],
			},
			{ name: 'useApi', path: '/example/use-api' },
		],
	},
];

export const othersItems: NavItem[] = [];
