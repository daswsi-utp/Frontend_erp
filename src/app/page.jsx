"use client"

import Link from 'next/link';
import { UserNav } from '@/components/user-nav';
import { ModeToggle } from '@/components/mode-toogle';
import LandbotFloating from '@/components/landbot-floating';
import { MODULES_CONFIG } from '@/lib/config/modules';
import { useAuth } from '@/providers/UserContext';
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';
import { ROLES } from '@/lib/config/roles'

export default function Home() {
    const { user } = useAuth();

    const getFilteredModules = (user) => {
        if (!user) return [];

        if (user.role === ROLES.ADMIN) {
            return Object.values(MODULES_CONFIG);
        }

        return Object.values(MODULES_CONFIG).filter(module =>
            module.allowedRoles.includes(user.role)
        );
    };

    const filteredModules = getFilteredModules(user);
    
    return (
        <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <div className="min-h-screen bg-white dark:bg-gray-950">
                <header className="border-b border-gray-200 dark:border-gray-800">
                    <div className="flex h-16 items-center px-4 justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-2">
                                <h1 className="text-xl font-semibold">ERP System</h1>
                            </Link>
                            <ModeToggle />
                        </div>
                        <div className="flex items-center space-x-4">
                            <UserNav />
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                            Seleccione un módulo
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Sistema de gestión empresarial
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {filteredModules.map((module) => (
                            <Link
                                href={module.path}
                                key={module.path}
                                className="flex flex-col items-center justify-center w-48 h-48 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all hover:border-blue-500 hover:scale-105 bg-white dark:bg-gray-900"
                            >
                                <div className="text-blue-600 dark:text-blue-400 mb-4">
                                    <module.icon size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    {module.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                    <LandbotFloating />
                </main>
            </div>
        </ProtectedRoute>
    )
}