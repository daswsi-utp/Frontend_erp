"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Tableorders = () => {
  const [search, setSearch] = useState("");
  const [ordenes, setOrdenes] = useState([
    { id: "ORD001", cliente: "Juan Pérez", fecha: "2025-04-20", estado: "En preparación" },
    { id: "ORD002", cliente: "Ana López", fecha: "2025-04-21", estado: "Enviado" },
    { id: "ORD003", cliente: "Carlos Ruiz", fecha: "2025-04-22", estado: "Entregado" },
  ]);

  const handleAddOrder = () => {
    const newOrder = {
      id: `ORD00${ordenes.length + 1}`,
      cliente: "Nuevo Cliente",
      fecha: new Date().toISOString().split("T")[0],
      estado: "En preparación",
    };
    setOrdenes([...ordenes, newOrder]);
  };

  const filteredOrders = ordenes.filter((orden) =>
    orden.cliente.toLowerCase().includes(search.toLowerCase()) ||
    orden.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Historial de Órdenes</h2>
        <Button onClick={handleAddOrder}>Agregar Orden</Button>
      </div>

      <Input
        placeholder="Buscar por cliente o ID de orden..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID de Orden</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((orden) => (
            <TableRow key={orden.id}>
              <TableCell>{orden.id}</TableCell>
              <TableCell>{orden.cliente}</TableCell>
              <TableCell>{orden.fecha}</TableCell>
              <TableCell>{orden.estado}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm">Preview</Button>
                <Button variant="secondary" size="sm">Factura</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tableorders;
