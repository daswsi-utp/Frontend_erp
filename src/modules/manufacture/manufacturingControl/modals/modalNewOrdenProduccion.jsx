"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NewOrdenProduccionModal = () => {
  const [formData, setFormData] = useState({
    codigoOrden: "",
    fechaInicio: "",
    fechaFin: "",
    producto: "",
    cantidad: "",
    estado: "En proceso",
    responsable: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Orden de Producción registrada:", formData);
    // Aquí iría la función para enviar la orden al backend
  };

  const estados = ["En proceso", "Finalizada", "Cancelada"];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Registrar Orden</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar nueva Orden de Producción</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Código de Orden</label>
            <Input onChange={(e) => handleChange("codigoOrden", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Fecha de Inicio</label>
            <Input type="date" onChange={(e) => handleChange("fechaInicio", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Fecha de Fin</label>
            <Input type="date" onChange={(e) => handleChange("fechaFin", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Producto</label>
            <Input onChange={(e) => handleChange("producto", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Cantidad</label>
            <Input type="number" onChange={(e) => handleChange("cantidad", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Responsable</label>
            <Input onChange={(e) => handleChange("responsable", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Estado</label>
            <Select
              defaultValue="En proceso"
              onValueChange={(value) => handleChange("estado", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona el estado" />
              </SelectTrigger>
              <SelectContent>
                {estados.map((estado, index) => (
                  <SelectItem key={index} value={estado}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} variant="default">
            Guardar Orden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrdenProduccionModal;