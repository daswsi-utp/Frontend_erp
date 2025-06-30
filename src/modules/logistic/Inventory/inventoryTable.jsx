'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash } from "lucide-react";

function getEstadoStock(actual, min, max) {
  if (actual <= min) return "Bajo";
  if (actual >= max) return "Alto";
  return "Regular";
}

function getColorEstado(estado) {
  switch (estado) {
    case "Bajo":
      return "text-red-500";
    case "Alto":
      return "text-green-500";
    case "Regular":
      return "text-yellow-500";
    default:
      return "";
  }
}

export default function InventoryTable({ inventarios, onAdd, onEdit, onDelete }) {
  if (!inventarios) return <div>No hay datos de inventario.</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Inventario</h3>
        <Button onClick={onAdd} className="flex gap-2 items-center">
          <Plus size={16} /> Añadir producto
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Proveedor</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Stock Mínimo</TableHead>
            <TableHead>Stock Máximo</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Sucursal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventarios.map((item) => {
            const estado = getEstadoStock(item.stock, item.stock_minimo, item.stock_maximo);
            const color = getColorEstado(estado);

            return (
              <TableRow key={item.id}>
                <TableCell>{item.sku ?? "—"}</TableCell>
                <TableCell>{item.nombre ?? "—"}</TableCell>
                <TableCell>{item.marca ?? "—"}</TableCell>
                <TableCell>S/. {item.precio?.toFixed(2) ?? "—"}</TableCell>
                <TableCell>{item.proveedor ?? "—"}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.stock_minimo}</TableCell>
                <TableCell>{item.stock_maximo}</TableCell>
                <TableCell>{item.ubicacion ?? "—"}</TableCell>
                <TableCell className={color}>{estado}</TableCell>
                <TableCell>{item.sucursal_nombre}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="icon" onClick={() => onEdit(item)}>
                    <Pencil size={16} />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => onDelete(item)}>
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}