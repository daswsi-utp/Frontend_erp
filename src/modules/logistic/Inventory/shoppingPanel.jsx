'use client';

import { useState } from "react";
import { 
  Card, CardHeader, CardTitle, CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

import useFetchProducts from "@/modules/logistic/hooks/useFetchProducts";
import useFetchProviders from "@/modules/logistic/hooks/useFetchProviders";
import useMutationSupplyings from "@/modules/logistic/hooks/useMutationSupplyings";

export default function ShoppingPanel() {
  const [compra, setCompra] = useState(initialForm());
  const [archivo, setArchivo] = useState(null);

  const { data: productosData } = useFetchProducts();
  const { data: proveedoresData } = useFetchProviders();
  const { createSupplying } = useMutationSupplyings();

  function initialForm() {
    return {
      producto_id: "",
      proveedor_id: "",
      cantidad: "",
      precio_unitario: "",
      fecha_compra: "",
      observacion: "",
    };
  }

  const handleChange = (e) => {
    setCompra({ ...compra, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(compra).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (archivo) data.append("documento_compra", archivo);

    try {
      await createSupplying(data);
      setCompra(initialForm());
      setArchivo(null);
    } catch (err) {
      console.error("Error al registrar la compra", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📥 Registro de Compras</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label>Producto</Label>
            <Select
              value={compra.producto_id}
              onValueChange={(val) => setCompra({ ...compra, producto_id: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un producto" />
              </SelectTrigger>
              <SelectContent>
                {productosData?.rows.map((p) => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Proveedor</Label>
            <Select
              value={compra.proveedor_id}
              onValueChange={(val) => setCompra({ ...compra, proveedor_id: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un proveedor" />
              </SelectTrigger>
              <SelectContent>
                {proveedoresData?.rows.map((p) => (
                  <SelectItem key={p.id_proveedor} value={p.id_proveedor.toString()}>
                    {p.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Cantidad</Label>
              <Input name="cantidad" type="number" value={compra.cantidad} onChange={handleChange} required />
            </div>
            <div>
              <Label>Precio Unitario (S/)</Label>
              <Input name="precio_unitario" type="number" value={compra.precio_unitario} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fecha de Compra</Label>
              <Input name="fecha_compra" type="date" value={compra.fecha_compra} onChange={handleChange} required />
            </div>
            <div>
              <Label>Comprobante</Label>
              <Input name="documento_compra" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
            </div>
          </div>

          <div>
            <Label>Observación</Label>
            <Textarea name="observacion" value={compra.observacion} onChange={handleChange} />
          </div>

          <Button type="submit" className="w-full">Registrar Compra</Button>
        </form>
      </CardContent>
    </Card>
  );
}