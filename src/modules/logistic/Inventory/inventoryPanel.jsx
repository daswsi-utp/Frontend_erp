'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProductFilters from "./productsFilters";
import ProductTable from "./productTable";

const productos = [
  {
    id: 1,
    nombre: "Mouse Logitech M280",
    sku: "MOU-LOG280",
    unidad: "unidad",
    proveedor: "Tech Import S.A.",
    stockActual: 5,
    stockMinimo: 10,
    stockMaximo: 50,
    precio: 25.99,
    categoria: "perifericos",
  },
  {
    id: 2,
    nombre: "Monitor Samsung 24”",
    sku: "MON-SAM24",
    unidad: "unidad",
    proveedor: "Global Tech",
    stockActual: 30,
    stockMinimo: 15,
    stockMaximo: 60,
    precio: 199.99,
    categoria: "pantallas",
  },
  {
    id: 3,
    nombre: "Teclado Mecánico Redragon",
    sku: "TEC-REDGM",
    unidad: "unidad",
    proveedor: "Distribuciones XYZ",
    stockActual: 12,
    stockMinimo: 10,
    stockMaximo: 40,
    precio: 45.5,
    categoria: "perifericos",
  },
  {
    id: 4,
    nombre: "Silla Ergonómica Azul",
    sku: "SIL-ERG-AZ",
    unidad: "unidad",
    proveedor: "Tech Import S.A.",
    stockActual: 8,
    stockMinimo: 12,
    stockMaximo: 35,
    precio: 89.9,
    categoria: "sillas",
  },
];

export default function InventoryPanel() {
  return (
    <Card>
      <CardHeader><CardTitle>Inventario de Productos</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ProductFilters />
        <ProductTable productos={productos} />
      </CardContent>
    </Card>
  );
}