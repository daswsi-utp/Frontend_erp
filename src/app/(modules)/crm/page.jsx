'use client'
import { Dashboard } from "./dashboard/dashboard";

export default function CrmPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen de tus actividades comerciales
          </p>
        </div>
      </div>
      
      <Dashboard />

    </div>
  );
}