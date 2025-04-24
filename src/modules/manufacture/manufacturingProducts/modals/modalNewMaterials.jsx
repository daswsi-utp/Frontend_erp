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

const NewMaterialModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "",
    unit: "",
    state: "Activo",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Nuevo material guardado:", formData);
    // llamar a una función para guardar el material en la BD
    
  };

  const categories = ["Oficina", "Limpieza", "Tecnología", "Otros"];
  /*const units = ["Unidad", "Caja", "Paquete", "Litro", "Metro"];*/

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Añadir</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar nuevo material</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Nombre</label>
            <Input onChange={(e) => handleChange("name", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Código</label>
            <Input onChange={(e) => handleChange("code", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Categoría</label>
            <Select onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat, index) => (
                  <SelectItem key={index} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Unidad</label>
            <Input onChange={(e) => handleChange("code", e.target.value)} />
              {/*<SelectContent>
                {units.map((u, index) => (
                  <SelectItem key={index} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>*/}
            
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Estado</label>
            <Select
              defaultValue="Disponible"
              onValueChange={(value) => handleChange("state", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona el estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Disponible">Disponible</SelectItem>
                <SelectItem value="No disponible">No disponible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} variant="default">
            Guardar material
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewMaterialModal;