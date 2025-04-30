'use client';
import { AppSidebar } from "@/components/app-sidebar";
import { UserNav } from '@/components/user-nav';
import Link from 'next/link';
import { ModeToggle } from "@/components/mode-toogle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/providers/UserContext";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";


export default function ModulesLayout({ children }) {

    const { user } = useAuth();

    return (
        <ProtectedRoute allowedRoles={['administrador', 'coordinator', 'comercial']}>
            <div className="flex h-full w-full">
                <AppSidebar user={user} />
                <div className="flex-1 flex flex-col h-full">
                    <header className="sticky top-0 z-40 border-b h-16 flex items-center justify-between px-4 bg-background">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger />
                            <Link href="/" className="flex items-center gap-2">
                                <h1 className="text-xl font-semibold">ERP System</h1>
                            </Link>
                            <ModeToggle />
                        </div>
                        <UserNav />
                    </header>
                    <main className="flex-1 overflow-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}