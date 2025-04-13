'use client';
import { AppSidebar } from "@/components/app-sidebar";
import { UserNav } from '@/components/user-nav';
import Link from 'next/link';

export default function ModulesLayout({ children }) {
    return (
        <div className="flex flex-1 h-full">
            {/* Sidebar Fixed */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 h-full">
                <AppSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-64 h-full">
                <header className="sticky top-0 z-40 border-b h-16 flex items-center justify-between px-4 bg-background">
                    <Link href="/" className="flex items-center gap-2">
                        <h1 className="text-xl font-semibold">ERP System</h1>
                    </Link>
                    <UserNav />
                </header>

                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}