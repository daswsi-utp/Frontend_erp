"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import useEntityMutation from "@/hooks/useEntityMutation";
import {isOnlyLetters} from "@/utils/validators";
import { useToast } from '@/components/ui/use-toast'
import { AlertCircle } from 'lucide-react'

const EditModal=({ open, onOpenChange, onItemChange, item })=> {

  const departmentMutation = useEntityMutation('department')
  const [formData, setFormData] = useState({ ...item });
  const { toast } = useToast()

  useEffect(() => {
      if (item && item.id !== formData.id) {
        setFormData({ ...item });
      }
    }, [item]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (onItemChange) {
      onItemChange(updated);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!isOnlyLetters(formData.name)) errors.push("Nombre solo debe contener letras.");
    if (!isOnlyLetters(formData.code)) errors.push("Codigo solo debe contener letras.");

    return errors;
  };


  const handleSave = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Error de validación",
        description: (
          <ul className="list-disc pl-4">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        ),
        variant: "destructive",
        icon: <AlertCircle className="text-red-500" />,
      })
      return;
    }
    try {
      console.log("Datos actualizados:", formData);
      departmentMutation.mutate({
        action: 'update',
        entity: formData,
        apiPath: '/rrhh/department'
      })
      onOpenChange(false);
    } catch (error) {
      console.error("Error during update department", error)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Departamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Nombre</label>
            <Input defaultValue={formData.name} onChange={(e) => handleChange("name", e.target.value)}/>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Código</label>
            <Input defaultValue={formData.code} onChange={(e) => handleChange("code", e.target.value)}/>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Estado</label>
            <Select defaultValue={formData.state} onValueChange={(value) => handleChange("state", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="ACTIVO">Activo</SelectItem>
                  <SelectItem value="INACTIVO">Inactivo</SelectItem>
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
}
export default EditModal;