"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { PackageOpen } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import useEntityMutation from "@/hooks/useEntityMutation";
import useFetchProviders from "../../hooks/useFetchProviders";


const NewProduct=({ })=> {

  const productMutation = useEntityMutation('product')
  const { data: providers } = useFetchProviders()
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("Datos guardados:", formData);
      productMutation.mutate({
        action: 'create',
        entity: formData,
        apiPath: '/logistic/products'
      })
    } catch (error) {
      console.error("Error during insert new product", error)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Registro de Producto</Button>
      </DialogTrigger>
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Nuevo Producto de la Organizacion</DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex flex-col gap-4">
          {/* Bloque con dos campos en columna + icono al lado */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <div className="flex flex-col gap-4 col-span-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Proveedor</label>
                <Select onValueChange={val => handleChange('proveedor', { id: val })}>
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
                <Input onChange={e => handleChange("sku", e.target.value)}/>
              </div>
            </div>
            <PackageOpen  size={180} className="text-primary" />
          </div>

          {/* Segundo bloque: campos normales en dos columnas */}
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Nombre</label>
                <Input onChange={e => handleChange("descripcion", e.target.value)}/>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Marca</label>
                <Input onChange={e => handleChange("marca", e.target.value)}/>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Precio</label>
                <Input type="number" step="0.01"
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
            <DialogClose className="rounded-lg border bg-gray-100 text-black px-3 py-1 font-bold" onClick={handleSave}>
                Guardar Cambios
            </DialogClose>          
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
export default NewProduct;