import { Layers } from 'lucide-react';

export type NavSubItem = {
	name: string;
	path: string;
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
		],
	},
];

export const othersItems: NavItem[] = [];
