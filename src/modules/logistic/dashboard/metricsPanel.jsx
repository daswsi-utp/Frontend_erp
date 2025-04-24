'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bar, Line } from "react-chartjs-2";
import { barChartData, lineChartData } from "./chartData"; // separa los datos si prefieres

// metricsPanel.jsx
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Registrar componentes necesarios
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );  

const productos = [
  { id: 1, nombre: "Mouse", stockActual: 5, stockMinimo: 10, stockMaximo: 50 },
  { id: 2, nombre: "Monitor", stockActual: 30, stockMinimo: 15, stockMaximo: 60 },
  { id: 3, nombre: "Teclado", stockActual: 12, stockMinimo: 10, stockMaximo: 40 },
  { id: 4, nombre: "Silla", stockActual: 8, stockMinimo: 12, stockMaximo: 35 },
];

export default function MetricsPanel() {
  const total = productos.length;
  const bajos = productos.filter(p => p.stockActual <= p.stockMinimo).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Total Productos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{total}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Stock Bajo</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-500">{bajos}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Capacidad Promedio</CardTitle></CardHeader>
          <CardContent><Progress value={65} className="h-2" /></CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Ventas por Mes</CardTitle></CardHeader><CardContent><Bar data={barChartData} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Rendimiento</CardTitle></CardHeader><CardContent><Line data={lineChartData} /></CardContent></Card>
      </div>
    </div>
  );
}