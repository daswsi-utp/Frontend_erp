import Link from 'next/link';
import { UsersRound, Forklift, BadgeDollarSign, BookUser, NotebookPen } from 'lucide-react';
import { UserNav } from '@/components/user-nav';

const modules = [
    { title: 'RRHH', icon: <UsersRound size={32} />, link: '/rrhh' },
    { title: 'Logística', icon: <Forklift size={32} />, link: '/logistics' },
    { title: 'Ventas', icon: <BadgeDollarSign size={32} />, link: '/sales' },
    { title: 'Clientes', icon: <BookUser size={32} />, link: '/customers' },
    { title: 'Planeación', icon: <NotebookPen size={32} />, link: '/planning' },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <header className="border-b border-gray-200 dark:border-gray-800">
                <div className="flex h-16 items-center px-4 justify-between">
                    <Link href="/" className="text-lg font-semibold">ERP System</Link>
                    <div className="flex items-center space-x-4">
                        <UserNav />
                    </div>
                </div>
            </header>

            <main className="p-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">Seleccione un módulo</h1>
                    <p className="text-gray-600 dark:text-gray-400">Sistema de gestión empresarial</p>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {modules.map((module, index) => (
                        <Link
                            href={module.link}
                            key={index}
                            className="flex flex-col items-center justify-center w-48 h-48 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all hover:border-blue-500 hover:scale-105 bg-white dark:bg-gray-900"
                        >
                            <div className="text-blue-600 dark:text-blue-400 mb-4">
                                {module.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                {module.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}