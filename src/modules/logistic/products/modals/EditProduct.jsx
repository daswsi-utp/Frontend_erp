"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { PackageOpen } from "lucide-react";
import useFetchProviders from "../../hooks/useFetchProviders";
import useEntityMutation from "@/hooks/useEntityMutation";


const EditProduct=({ open, onOpenChange, product, onProductChange })=> {
  if (!product) return null;

  const productMutation = useEntityMutation('product')
  const { data: providers } = useFetchProviders()
  
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (onProductChange) {
      onItemChange(updated);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Datos actualizados:", formData);
      productMutation.mutate({
        action: 'update',
        entity: formData,
        apiPath: `/logistic/products/${formData.id}`
      })
      onOpenChange(false);
    } catch (error) {
      console.error("Error during update product", error)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-h-[60vh]">
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Editar Producto</DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex flex-col gap-4">
          {/* Bloque con dos campos en columna + icono al lado */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <div className="flex flex-col gap-4 col-span-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Proveedor</label>
                <Select value={formData.proveedor?.id} onValueChange={val => handleChange('proveedor', { id: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    {(providers?.rows.map((provider)=>(
                      <SelectItem key={provider.id} value={provider.id}>{provider.nombre}</SelectItem>
                    )))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">SKU</label>
                <Input value={formData.sku} onChange={e => handleChange("sku", e.target.value)}/>
              </div>
            </div>
            <PackageOpen  size={180} className="text-primary" />
          </div>

          {/* Segundo bloque: campos normales en dos columnas */}
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Nombre</label>
                <Input value={formData.descripcion} onChange={e => handleChange("descripcion", e.target.value)}/>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Marca</label>
                <Input value={formData.marca} onChange={e => handleChange("marca", e.target.value)}/>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Precio</label>
                <Input value={formData.precio} type="number" step="0.01"
                  onChange={e => {
                    const value = e.target.value;
                    handleChange("precio", value === "" ? "" : parseFloat(value));
                  }}
                />
              </div>

            </div>
          </ScrollArea>
        </div>

          <DialogFooter className="mt-6">
            <Button variant="default" onClick={handleSave}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
export default EditProduct;