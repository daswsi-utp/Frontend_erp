"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const EditMaterialModal = ({ open, onOpenChange, item }) => {
  if (!item) return null;

  const [formData, setFormData] = useState({ ...item });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Material editado:", formData);
    // Faltaria a;adir funcion para guardar cambios en backend
    onOpenChange(false);
  };



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Material</DialogTitle>
        </DialogHeader>
  
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Nombre</label>
            <Input
              defaultValue={item.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
  
          <div className="flex flex-col gap-1">
            <label className="text-sm">Categoría</label>
            <Input
              defaultValue={item.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
          </div>
  
          <div className="flex flex-col gap-1">
            <label className="text-sm">Unidades</label>
            <Input
              defaultValue={item.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
            />
          </div>
  
          <div className="flex flex-col gap-1">
            <label className="text-sm">Código</label>
            <Input
              defaultValue={item.code}
              onChange={(e) => handleChange("code", e.target.value)}
            />
          </div>
  
          <div className="flex flex-col gap-1">
            <label className="text-sm">Estado</label>
            <Select
              defaultValue={item.state}
              onValueChange={(value) => handleChange("state", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Disponible">Disponible</SelectItem>
                <SelectItem value="No disponible">No disponible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
  
        <DialogFooter>
          <Button onClick={handleSave} variant="default">Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
};

export default EditMaterialModal;