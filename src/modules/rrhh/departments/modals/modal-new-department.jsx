"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import useEntityMutation from "@/hooks/useEntityMutation";
import {isOnlyLetters} from "@/utils/validators";
import { useToast } from '@/components/ui/use-toast'
import { AlertCircle } from 'lucide-react'


const NewDepartment=({ })=> {

  const departmentMutation = useEntityMutation('department')
  const [formData, setFormData] = useState({ state: 'ACTIVO' });
  const { toast } = useToast()

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
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
     console.log("Datos guardados:", formData);
     departmentMutation.mutate({
        action: 'create',
        entity: formData,
        apiPath: `/rrhh/department`
      })
    } catch (error) {
      console.error("Error during create new department", error)
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo Departamento</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Departamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Nombre</label>
            <Input onChange={(e) => handleChange("name", e.target.value)}/>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Código</label>
            <Input onChange={(e) => handleChange("code", e.target.value)}/>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Estado</label>
            <Select defaultValue="ACTIVO" onValueChange={(value) => handleChange("state", value)}>
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
          <DialogClose className="rounded-lg border bg-gray-100 text-black px-3 py-1 font-bold" onClick={handleSave}>
              Guardar Cambios
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default NewDepartment;