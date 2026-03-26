import { SidebarProvider } from '@/shared/context/layout/SidebarContext';
import LayoutContent from './LayoutContent';

interface IRootLayoutProps {
	//
}

export default function RootLayout({}: IRootLayoutProps): React.ReactNode {
	return (
		<SidebarProvider>
			<LayoutContent />
		</SidebarProvider>
	);
}
