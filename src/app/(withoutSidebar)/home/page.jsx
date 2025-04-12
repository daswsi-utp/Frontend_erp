import Link from 'next/link';
import { UsersRound, Forklift, BadgeDollarSign, BookUser, NotebookPen } from 'lucide-react';

const modules = [
  { title: 'RRHH', icon: <UsersRound />, link: '/dashboard' },
  { title: 'Logística', icon: <Forklift />, link: '/dashboard' },
  { title: 'Ventas', icon: <BadgeDollarSign />, link: '/dashboard' },
  { title: 'Clientes', icon: <BookUser />, link: '/dashboard' },
  { title: 'Planeacion', icon: <NotebookPen />, link: '/dashboard' },
  // Agrega más módulos aquí
];

export default function ModulesPage() {
  return (
    <div className="min-h-screen p-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Módulos de mi ERP</h1>
      </header>

      <div className="flex flex-wrap justify-center gap-6">
        {modules.map((module, index) => (
          <Link
            href={module.link}
            key={index}
            className="flex flex-col items-center justify-center w-40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            {module.icon}
            <h3 className="mt-4 text-lg font-medium text-gray-950 dark:text-gray-200">
              {module.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}