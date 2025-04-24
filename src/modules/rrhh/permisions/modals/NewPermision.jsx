"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Ambulance   } from "lucide-react";


const PermisionNew=()=> {

  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Datos guardados:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo Permiso</Button>
      </DialogTrigger>
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Nuevo Registro de Permiso</DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex flex-col gap-4">
          {/* Bloque con dos campos en columna + icono al lado */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <div className="flex flex-col gap-4 col-span-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Empleado</label>
                <Select onValueChange={val => handleChange('employee', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employee1">Daniel Cabrera</SelectItem>
                    <SelectItem value="Employee2">Empleado 2</SelectItem>
                    <SelectItem value="Employee3">Empleado 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dias tomados</label>
                <Input
                  type="text"
                  onChange={e => handleChange("startDate", e.target.value)}
                />
              </div>
            </div>
            <Ambulance  size={180} className="text-primary" />
          </div>

          {/* Segundo bloque: campos normales en dos columnas */}
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dia de Inicio</label>
                <Input
                  type="date"
                  onChange={e => handleChange("startDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dia de Fin</label>
                <Input
                  type="date"
                  onChange={e => handleChange("endDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Estado</label>
                <Select onValueChange={val => handleChange('state', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APROVADO">APROVADO</SelectItem>
                    <SelectItem value="PENDIENTE">PENDIENTE</SelectItem>
                    <SelectItem value="DESAPROVADO">DESAPROVADO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dia de Solicitud</label>
                <Input
                  type="date"
                  onChange={e => handleChange("endDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select onValueChange={val => handleChange('state', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENFERMEDAD">ENFERMEDAD</SelectItem>
                    <SelectItem value="MATERNIDAD">MATERNIDAD</SelectItem>
                    <SelectItem value="LUTO">LUTO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </ScrollArea>
        </div>

          <DialogFooter className="mt-6">
            <Button variant="default">Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
export default PermisionNew;