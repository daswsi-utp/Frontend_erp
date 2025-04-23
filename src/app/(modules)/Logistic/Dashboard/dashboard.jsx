'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ArrowUpDown, Warehouse, Boxes, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Icons = {
  stock: Boxes,
  storage: Warehouse,
  alert: AlertTriangle,
  sort: ArrowUpDown
};

const productos = [
  { id: 1, nombre: "Mouse Logitech", stockActual: 5, stockMinimo: 10, stockMaximo: 50 },
  { id: 2, nombre: "Monitor LG 27''", stockActual: 30, stockMinimo: 15, stockMaximo: 60 },
  { id: 3, nombre: "Teclado Mecánico", stockActual: 12, stockMinimo: 10, stockMaximo: 40 },
  { id: 4, nombre: "Silla Gamer", stockActual: 8, stockMinimo: 12, stockMaximo: 35 },
];

// Función para calcular el estado de stock
function getEstadoStock(actual, min, max) {
  if (actual <= min) return "Bajo";
  if (actual >= max) return "Alto";
  return "Regular";
}

// Opcional: estilos por estado
function getColorEstado(estado) {
  switch (estado) {
    case "Bajo": return "text-red-500";
    case "Alto": return "text-green-500";
    case "Regular": return "text-yellow-500";
  }
}

export default function InventoryDashboard() {
  const totalProductos = productos.length;
  const productosBajoStock = productos.filter(p => p.stockActual <= p.stockMinimo).length;

  return (
    <div className="space-y-6 p-6">
      {/* MÉTRICAS */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProductos}</div>
            <p className="text-sm text-muted-foreground">En inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos en bajo stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{productosBajoStock}</div>
            <p className="text-sm text-muted-foreground">Requieren reabastecimiento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Capacidad Promedio de Almacén</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={65} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">Basado en stock actual</p>
          </CardContent>
        </Card>
      </div>

      {/* TABLA DE PRODUCTOS */}
      <Card>
        <CardHeader>
          <CardTitle>Productos en Inventario</CardTitle>
          <CardDescription>Estado actual de stock</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Stock Actual</TableHead>
                <TableHead>Estado de Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.map((producto) => {
                const estado = getEstadoStock(producto.stockActual, producto.stockMinimo, producto.stockMaximo);
                const color = getColorEstado(estado);

                return (
                  <TableRow key={producto.id}>
                    <TableCell className="font-medium">{producto.nombre}</TableCell>
                    <TableCell>{producto.stockActual}</TableCell>
                    <TableCell className={color}>{estado}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}