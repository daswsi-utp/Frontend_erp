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
import axios from "axios";
import TiptapEditor from "@/components/tiptap";


const NewMail=({fetchMails})=> {

  const {getModel, insertModel} = useCrud()
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
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
    return employees.map(emp => emp.email);
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

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8095/api/v1/rrhh/department");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8095/api/v1/rrhh/employee");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const fetchEmployeesByDepartment = async (id) =>{
    try {
      const response = await axios.get(`http://localhost:8095/api/v1/rrhh/employee/department/${id}`);
      selectDestinatarios(response.data);
      setReadyForMail(true);
    } catch (error) {
      console.error("Error fetching employees", error);
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
      await insertModel(dataToSend, "/api/v1/manufacture/mail");
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

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo Empleado</Button>
      </DialogTrigger>
        <DialogContent className="max-w-xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Nuevo Empleado</DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="h-[70vh] pr-2">
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
                        {departments.map((dept) => (
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
                      const employee = employees.find((e) => e.id.toString() === id);
                      setSelectedEmployee(employee);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione Empleado" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((emp) => (
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