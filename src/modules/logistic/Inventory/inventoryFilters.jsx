'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useCrud from "@/hooks/useCrud";

export default function InventoryFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    sku: "",
    nombre: "",
    marca: "",
    precio: "",
    proveedor: "",
    stock: "",
    ubicacion: "",
    estado: "",
    sucursal: "",
  });

  const { getModel } = useCrud(""); // Centraliza las llamadas usando rutas completas

  const [marcas, setMarcas] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const estados = ["Bajo", "Regular", "Alto"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productos, inventario, proveedoresRes, sucursalesRes] = await Promise.all([
          getModel("/logistic/products"),
          getModel("/logistic/inventory"),
          getModel("/logistic/providers"),
          getModel("/logistic/branches"),
        ]);

        setMarcas([...new Set(productos.map(p => p.marca))]);
        setProveedores(proveedoresRes.map(p => p.nombre));
        setUbicaciones([...new Set(inventario.map(i => i.ubicacion))]);
        setSucursales(sucursalesRes.map(s => s.nombre));
      } catch (error) {
        console.error("Error cargando filtros del inventario:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    const updated = { ...filters, [field]: value };
    setFilters(updated);

    // Filtrado inmediato para campos de texto
    if (field === "sku" || field === "nombre") {
      onFilter(updated);
    }
  };

  const resetFilters = () => {
    const initialFilters = {
      sku: "",
      nombre: "",
      marca: "",
      precio: "",
      proveedor: "",
      stock: "",
      ubicacion: "",
      estado: "",
      sucursal: "",
    };
    setFilters(initialFilters);
    onFilter(initialFilters);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* SKU y Nombre */}
        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            value={filters.sku}
            onChange={(e) => handleChange("sku", e.target.value)}
            placeholder="Ej. MOU-LOG280"
          />
        </div>
        <div>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={filters.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            placeholder="Ej. Teclado Mecánico"
          />
        </div>

        {/* Marca */}
        <div>
          <Label htmlFor="marca">Marca</Label>
          <Select
            value={filters.marca}
            onValueChange={(value) => handleChange("marca", value)}
          >
            <SelectTrigger id="marca">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              {marcas.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Precio */}
        <div>
          <Label htmlFor="precio">Precio</Label>
          <Select
            value={filters.precio}
            onValueChange={(value) => handleChange("precio", value)}
          >
            <SelectTrigger id="precio">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="250">≤ 250</SelectItem>
              <SelectItem value="500">≤ 500</SelectItem>
              <SelectItem value="750">≤ 750</SelectItem>
              <SelectItem value="1000">≤ 1000</SelectItem>
              <SelectItem value="1001">≥ 1000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Proveedor */}
        <div>
          <Label htmlFor="proveedor">Proveedor</Label>
          <Select
            value={filters.proveedor}
            onValueChange={(value) => handleChange("proveedor", value)}
          >
            <SelectTrigger id="proveedor">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              {proveedores.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stock */}
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Select
            value={filters.stock}
            onValueChange={(value) => handleChange("stock", value)}
          >
            <SelectTrigger id="stock">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">≤ 10</SelectItem>
              <SelectItem value="25">≤ 25</SelectItem>
              <SelectItem value="50">≤ 50</SelectItem>
              <SelectItem value="60">≥ 60</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ubicación */}
        <div>
          <Label htmlFor="ubicacion">Ubicación</Label>
          <Select
            value={filters.ubicacion}
            onValueChange={(value) => handleChange("ubicacion", value)}
          >
            <SelectTrigger id="ubicacion">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              {ubicaciones.map((u) => (
                <SelectItem key={u} value={u}>{u}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Estado */}
        <div>
          <Label htmlFor="estado">Estado de Stock</Label>
          <Select
            value={filters.estado}
            onValueChange={(value) => handleChange("estado", value)}
          >
            <SelectTrigger id="estado">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              {estados.map((e) => (
                <SelectItem key={e} value={e}>{e}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sucursal */}
        <div>
          <Label htmlFor="sucursal">Sucursal</Label>
          <Select
            value={filters.sucursal}
            onValueChange={(value) => handleChange("sucursal", value)}
          >
            <SelectTrigger id="sucursal">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              {sucursales.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={resetFilters}>
          Quitar filtros
        </Button>
        <Button onClick={() => onFilter(filters)}>
          Filtrar
        </Button>
      </div>
    </div>
  );
}