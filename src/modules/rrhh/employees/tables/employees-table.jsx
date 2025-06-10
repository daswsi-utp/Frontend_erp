"use client"
import { useState, useMemo } from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Trash2, SquarePen, Search, ShieldCheck } from 'lucide-react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useCrud from "@/hooks/useCrud";
import axios from "axios"


const EmployeesTable = ({ data, setSelectedEmployee, setOpenEdit, deleteEmployee }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchState, setSearchState] = useState('')
  const {getModel, insertModel, updateModel} = useCrud()
  

  const filteredEmployees = useMemo(() => {
    if (!data) return []
    if (!searchTerm && !searchState) return data
    return data.filter(employee => {
      const matchesName =
        !searchTerm ||
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase());
  
      const matchesState =
        searchState === 'todos' ||
        employee.state?.toLowerCase().includes(searchState.toLowerCase());
  
      return matchesName && matchesState;
    });
  }, [data, searchTerm, searchState])
  
  const columns = [
      { key: 'index', label: 'Codigo', className: 'w-10' },
      { key: 'firstName', label: 'Nombre' },
      { key: 'lastName', label: 'Apellido' },
      { key: 'department', label: 'Departamento' },
      { key: 'position', label: 'Cargo' },
      { key: 'state', label: 'Estado' },
      { key: 'options', label: 'Opciones' }
  ];

  const typeColorVariants = {
    ACTIVO: 'bg-green-300 text-green-800',
    VACACIONES: 'bg-orange-300 text-orange-800',
    PERMISO: 'bg-orange-300 text-orange-800',
    DESACTIVADO: 'bg-red-300 text-red-800'
  }

  const handleActivate = async (employee) => {
    try {
      const updatedEmployee = {
        ...employee,
        account: "ACTIVADO"
      }
      await updateModel(updatedEmployee, "/rrhh/employee")

      const account = {
        email: employee.email,
        dni: employee.dni,
        password: employee.dni,
        passwordConfirmation: employee.dni,
        roleName: employee.role.name,
      }

      await axios.post("http://localhost:8096/api/auth/activate", account)
      console.log("Empleado activado y editado correctamente:", account)
    } catch (error) {
      console.error("Error activando empleado:", error)
    }
  }

  return (
      <div className="relative w-full max-w-[100vw] overflow-hidden">
        <ScrollArea className="w-full">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar empleado por nombre o apellido"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select onValueChange={val => setSearchState(val)}>
                  <SelectTrigger className="w-full pl-9">
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="desactivado">Desactivado</SelectItem>
                    <SelectItem value="vacaciones">Vacaciones</SelectItem>
                    <SelectItem value="permiso">Permiso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="min-w-max w-full rounded-md border">
            <Table >
              <TableHeader className="bg-gray-200 dark:bg-gray-900">
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key} className={column.className}>
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.firstName}</TableCell>
                    <TableCell>{employee.lastName}</TableCell>
                    <TableCell>{employee.department.name}</TableCell>
                    <TableCell>{employee.position?.replaceAll("_", " ")}</TableCell>
                    <TableCell>
                      <Badge className={`${typeColorVariants[employee.state]} text-xs w-fit`}>
                        {employee.state}
                      </Badge>
                    </TableCell>
                    <TableCell className="w-32">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="link" onClick={() => {
                              setSelectedEmployee(employee);
                              setOpenEdit(true);
                            }}><SquarePen size={16}/></Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar Empleado</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="destructive" onClick={() => {
                                deleteEmployee(employee);
                            }}><Trash2 size={16}/></Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar Empleado</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {employee.account?.toUpperCase() !== "ACTIVADO" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="link" onClick={() => {
                                handleActivate(employee);
                              }}><ShieldCheck size={16}/></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Activar Cuenta</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      </div>
  );
};
  
export default EmployeesTable;