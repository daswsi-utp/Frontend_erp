'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

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
  }
}

export default function ProductTable({ productos }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Unidad</TableHead>
          <TableHead>Proveedor</TableHead>
          <TableHead>Stock Actual</TableHead>
          <TableHead>Stock Mínimo</TableHead>
          <TableHead>Stock Máximo</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Estado de Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productos.map((producto) => {
          const estado = getEstadoStock(
            producto.stockActual,
            producto.stockMinimo,
            producto.stockMaximo
          );
          const color = getColorEstado(estado);

          return (
            <TableRow key={producto.id}>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>{producto.sku ?? "—"}</TableCell>
              <TableCell>{producto.unidad ?? "unidad"}</TableCell>
              <TableCell>{producto.proveedor ?? "Tech Import S.A."}</TableCell>
              <TableCell>{producto.stockActual}</TableCell>
              <TableCell>{producto.stockMinimo}</TableCell>
              <TableCell>{producto.stockMaximo}</TableCell>
              <TableCell>${producto.precio?.toFixed(2) ?? "0.00"}</TableCell>
              <TableCell>{producto.categoria ?? "Otros"}</TableCell>
              <TableCell className={color}>{estado}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}