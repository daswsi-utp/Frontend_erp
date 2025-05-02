"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { UserCircle } from "lucide-react";

const NewEmployee=()=> {

  const [formData, setFormData] = useState({ state: 'Activo' });

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
        <Button variant="outline">Nuevo Empleado</Button>
      </DialogTrigger>
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Nuevo Empleado</DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="h-[70vh] pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Nombre</label>
                <Input onChange={e => handleChange('firstName', e.target.value)} className="mb-1" />
                <label className="text-sm font-medium mb-1">Apellido</label>
                <Input onChange={e => handleChange('lastName', e.target.value)} className="mb-1" />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <UserCircle size={128} />
              </div>

              {[
                { label: "Codigo de empleado", field: "code" },
                { label: "DNI", field: "dni" },
                { label: "Correo Electrónico", field: "email" },
                { label: "Teléfono", field: "phoneNumber" },
                { label: "Dirección", field: "address" },
                { label: "Fecha de Nacimiento", field: "birthDate", type: "date" },
                { label: "Contacto de emergencia - Nombre", field: "emergencyContactName" },
                { label: "Contacto de emergencia - Número", field: "emergencyContactPhone" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">{item.label}</label>
                  <Input
                    type={item.type || "text"}
                    onChange={e => handleChange(item.field, e.target.value)}
                  />
                </div>
              ))}

              {/* Género */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Género</label>
                <Select onValueChange={val => handleChange('gender', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Masculino</SelectItem>
                    <SelectItem value="FEMALE">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Departamento */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Departamento</label>
                <Select onValueChange={val => handleChange('department', { id: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Recursos Humanos</SelectItem>
                    <SelectItem value="2">Client Relation Managment</SelectItem>
                    <SelectItem value="3">Inventario</SelectItem>
                    <SelectItem value="4">Finanzas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cargo */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Cargo</label>
                <Select onValueChange={val => handleChange('position', { id: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Gerente de Area</SelectItem>
                    <SelectItem value="2">Ejecutivo de Inventario</SelectItem>
                    <SelectItem value="3">Contadora</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Estado */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Estado</label>
                <Select defaultValue="Activo" onValueChange={val => handleChange('state', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="mt-6">
            <Button variant="default" onClick={handleSave}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
export default NewEmployee;