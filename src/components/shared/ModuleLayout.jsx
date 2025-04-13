'use client';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { UserNav } from '../user-nav';
import { AppSidebar } from '@/components/app-sidebar';

export function ModuleLayout({ children }) {
    const pathname = usePathname();
    const isModuleRoute = pathname.startsWith('/hr') ||
        pathname.startsWith('/logistics') ||
        pathname.startsWith('/sales') ||
        pathname.startsWith('/customers') ||
        pathname.startsWith('/planning');

    return (
        <div className="flex min-h-screen">
            {isModuleRoute && <AppSidebar />}

            <div className="flex-1 flex flex-col">
                <header className="border-b h-16 flex items-center justify-end px-4">
                    <UserNav />
                </header>

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}