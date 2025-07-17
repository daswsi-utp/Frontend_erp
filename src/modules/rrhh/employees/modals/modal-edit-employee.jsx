"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import React, { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import useCrud from "@/hooks/useCrud";
import { positions } from "../data/positions";
import useEntityMutation from "@/hooks/useEntityMutation";
import useFetchDepartments from "../../hooks/useFetchDepartments";
import useFetchRoles from "../../hooks/useFetchRoles";
import {isOnlyLetters, isValidDNI, isValidEmail, isValidPhone, isNonEmpty, isValidDate} from "@/utils/validators";
import { useToast } from '@/components/ui/use-toast'
import { AlertCircle } from 'lucide-react'

const EditEmployeeModal = ({ open, onOpenChange, employee, onEmployeeChange  }) =>{

  const employeeMutation = useEntityMutation('employee')
  const [formData, setFormData] = useState(employee ?? {});
  const { data: departments } = useFetchDepartments();
  const { data: roles} = useFetchRoles();
  const { toast } = useToast()

  useEffect(() => {
    if (employee && employee.id !== formData.id) {
      setFormData({ ...employee });
    }
  }, [employee]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (onEmployeeChange) {
      onEmployeeChange(updated);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!isOnlyLetters(formData.firstName)) errors.push("Nombre solo debe contener letras.");
    if (!isOnlyLetters(formData.lastName)) errors.push("Apellido solo debe contener letras.");
    if (!isValidDNI(formData.dni)) errors.push("DNI inválido.");
    if (!isValidPhone(formData.phone)) errors.push("Teléfono inválido.");
    if (!isNonEmpty(formData.email)) errors.push("Correo no debe estar vacío.");
    if (!isValidDate(formData.birthDate)) errors.push("Fecha de nacimiento inválida.");
    if (!isValidEmail(formData.email)) errors.push("Correo electronico inválido.");
    if (!formData.gender) errors.push("Debe seleccionar género.");
    if (!formData.department?.id) errors.push("Debe seleccionar un departamento.");
    if (!formData.role?.id) errors.push("Debe seleccionar un rol.");
    if (!formData.position) errors.push("Debe seleccionar una posición.");
    if (!formData.state) errors.push("Debe seleccionar estado.");
    if (!isNonEmpty(formData.address) || formData.address.length < 5) {
      errors.push("Dirección es obligatoria y debe tener al menos 5 caracteres.");
    }
    if (!isOnlyLetters(formData.emergencyContactName)) {
      errors.push("Nombre del contacto de emergencia solo debe contener letras.");
    }
    if (!isValidPhone(formData.emergencyContactPhone)) {
      errors.push("Teléfono de emergencia inválido.");
    }

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
      employeeMutation.mutate({
        action: 'update',
        entity: formData,
        apiPath: '/rrhh/employee'
      })
      onOpenChange(false);
    } catch (error) {
      console.error("Error during update employe", error)
    }
  };

  

  return (
    <div className="relative h-full max-h-screen overflow-hidden">
      <Dialog open={open} onOpenChange={onOpenChange} className="max-h-[60vh]">
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Editar Empleado</DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="h-[70vh] pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Nombre</label>
                <Input value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} className="mb-1" />
                <label className="text-sm font-medium mb-1">Apellido</label>
                <Input value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} className="mb-1" />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <UserCircle size={128} />
              </div>

              {[
                { label: "DNI", field: "dni", value: formData.dni },
                { label: "Correo Electrónico", field: "email", value: formData.email },
                { label: "Teléfono", field: "phone", value: formData.phone },
                { label: "Dirección", field: "address", value: formData.address },
                { label: "Contacto de emergencia - Nombre", field: "emergencyContactName", value: formData.emergencyContactName },
                { label: "Contacto de emergencia - Número", field: "emergencyContactPhone", value: formData.emergencyContactPhone },
                { label: "Fecha de Nacimiento", field: "birthDate", type: "date", value: formData.birthDate },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">{item.label}</label>
                  <Input
                    value={item.value}
                    type={item.type || "text"}
                    onChange={e => handleChange(item.field, e.target.value)}
                  />
                </div>
              ))}

              {/* Género */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Género</label>
                <Select defaultValue={formData.gender} onValueChange={val => handleChange('gender', val)}>
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
                <Select defaultValue={formData.department?.id} onValueChange={val => handleChange('department', { id: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments?.rows?.map((department)=>(
                      <SelectItem key={department.id} value={department.id}>{department.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
              </div>

              {/* Role */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Role</label>
                <Select defaultValue={formData.role?.id}  onValueChange={val => handleChange('role', { id: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles?.rows?.map((role)=>(
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
              </div>

              {/* Posicion */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Posicion</label>
                <Select defaultValue={formData.position}  onValueChange={val => handleChange('position', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position)=>(
                      <SelectItem key={position.id} value={position.id}>{position.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Estado */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Estado</label>
                <Select defaultValue={formData.state} onValueChange={val => handleChange('state', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVO">Activo</SelectItem>
                    <SelectItem value="DESACTIVADO">Desactivado</SelectItem>
                    <SelectItem value="VACACIONES">Vacaciones</SelectItem>
                    <SelectItem value="PERMISO">Permiso</SelectItem>
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
    </div>
  );
}
export default EditEmployeeModal;