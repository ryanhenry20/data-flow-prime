import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { TopNavbar } from './TopNavbar';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-gray-950 dark:to-blue-950/20">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                    <TopNavbar />
                    <main className="flex-1 p-6 overflow-auto bg-transparent">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
