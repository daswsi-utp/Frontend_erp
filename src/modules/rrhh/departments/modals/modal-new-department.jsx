"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";


const NewModal=({ type })=> {

  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Datos guardados:", formData);
    onOpenChange(false); // Cierra el modal
  };

  const managers = [
    "Daniel Cabrera Saavedra",
    "Pinwino",
    "Estefani",
    "Sebastian",
    "Elvis",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo {type === "department" ? "Departamento" : "Cargo"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo {type === "department" ? "Departamento" : "Cargo"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {type === "department" && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Nombre</label>
                <Input
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Código</label>
                <Input
                  onChange={(e) => handleChange("code", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Encargado</label>
                <Select
                  onValueChange={(value) => handleChange("manager", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un encargado" />
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map((manager, index) => (
                      <SelectItem key={index} value={manager}>
                        {manager}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Estado</label>
                <Select
                  defaultValue="Activo"
                  onValueChange={(value) => handleChange("state", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un encargado" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          
          {type === "position" && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Nombre</label>
                <Input
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Descripción</label>
                <Input
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Estado</label>
                <Select
                  defaultValue="Activo"
                  onValueChange={(value) => handleChange("state", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un encargado" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSave} variant="default">Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default NewModal;