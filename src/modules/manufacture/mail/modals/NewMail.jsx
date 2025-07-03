"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Mail  } from "lucide-react";
import useCrud from "@/hooks/useCrud";
import { DialogClose } from "@radix-ui/react-dialog";
import TiptapEditor from "@/components/tiptap";
import useFetchDepartments from "@/modules/rrhh/hooks/useFetchDepartments";
import useFetchEmployees from "@/modules/rrhh/hooks/useFetchEmployee";
import useEntityMutation from "@/hooks/useEntityMutation";


const NewMail=({})=> {
  const mailMutation = useEntityMutation('mail')
  const {getModel} = useCrud()
  const { data: departments } = useFetchDepartments();
  const { data: employees} = useFetchEmployees();
  const [employeesDepartment, setEmployeesDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const [mailType, setMailType] = useState("GLOBAL");
  const [destinatarios, setDestinatarios] = useState([]);
  const [readyForMail, setReadyForMail] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const buildEmailArrayFromEmployees = (employees) => {
    return employees?.rows.map(emp => emp.email);
  };

  const buildEmailArrayFromSingleEmployee = (employee) => {
    return employee?.email ? [employee.email] : [];
  };

  const selectDestinatarios = (data) =>{
    const users = buildEmailArrayFromEmployees(data);
    setDestinatarios(users);
  }
  const selectDestinatario = (employee) =>{
    const users = buildEmailArrayFromSingleEmployee(employee);
    setDestinatarios(users);
  }

  const fetchEmployeesByDepartment = async (id) =>{
    try {
      const response = await getModel(`/rrhh/employee/department/${id}`);
      selectDestinatarios(response);
      setReadyForMail(true);
    } catch (error) {
      console.error("Error fetching employees by department", error);
    }
  }

  const handleMailTypeChange = (val) => {
    setMailType(val);
    setReadyForMail(false);
    setDestinatarios([]);
  };

  const handleSave = async () =>{
    try {
      const dataToSend = {
        ...formData,
        to: destinatarios,
      };
      mailMutation.mutate({
        action: 'create',
        entity: dataToSend,
        apiPath: '/manufacture/mail'
      })
      setReadyForMail(false);
      setFormData({});
      setMailType("GLOBAL");
    } catch (error) {
      console.error("Error during send emails", error);
      setReadyForMail(false);
      setFormData({});
      setMailType("GLOBAL");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo Correo</Button>
      </DialogTrigger>
        <DialogContent className="max-w-xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Nuevo Correo</DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="h-[50vh] pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Tipo de Correo</label>
                <Select value={mailType} onValueChange={handleMailTypeChange} >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GLOBAL">GLOBAL</SelectItem>
                    <SelectItem value="DEPARTAMENTO">DEPARTAMENTO</SelectItem>
                    <SelectItem value="PERSONAL">PERSONAL</SelectItem>
                  </SelectContent>
                </Select>
                {mailType === "GLOBAL" && (
                  <div className="mt-2">
                    <Button
                      onClick={() => {
                        setDestinatarios(buildEmailArrayFromEmployees(employees));
                        setReadyForMail(true);
                      }}
                    >
                      Hecho
                    </Button>
                  </div>
                )}

                {mailType === "DEPARTAMENTO" && (
                  <div className="mt-2">
                    <Select onValueChange={(val) => setSelectedDepartment(val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione Departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments?.rows.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedDepartment && (
                      <Button onClick={() => fetchEmployeesByDepartment(selectedDepartment)} className="mt-2">
                        Hecho
                      </Button>
                    )}
                  </div>
                )}

                {mailType === "PERSONAL" && (
                  <div className="mt-2">
                    <Select onValueChange={(id) => {
                      const employee = employees?.rows.find((e) => e.id.toString() === id);
                      setSelectedEmployee(employee);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione Empleado" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees?.rows.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id.toString()}>
                            {emp.firstName} {emp.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedEmployee && (
                      <Button
                        onClick={() => {
                          setDestinatarios(buildEmailArrayFromSingleEmployee(selectedEmployee));
                          setReadyForMail(true);
                        }}
                        className="mt-2"
                      >
                        Hecho
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center justify-center ">
                <Mail  size={128} />
              </div>
            </div>
            {readyForMail && (
                <>
                  <label className="text-sm font-medium">Asunto</label>
                  <Input onChange={(e) => handleChange("subject", e.target.value)} />
                  <label className="text-sm font-medium">Cuerpo del correo</label>
                  <TiptapEditor onChange={(html) => handleChange("body", html)} />
                </>
              )}
          </ScrollArea>
          <DialogFooter className="mt-1">
            <DialogClose onClick={handleSave}>
              Guardar Cambios
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
export default NewMail;