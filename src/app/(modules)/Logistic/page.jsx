'use client';

import InventoryDashboard from "./Dashboard/dashboard";

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard de Inventario</h1>
      </header>

      <main className="p-6">
        <InventoryDashboard />
      </main>
    </div>
  );
}