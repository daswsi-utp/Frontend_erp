"use client"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen, BookUser } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const EmployeesTable = ({ data, setSelectedEmployee, setOpenEdit, setOpenDelete }) => {

    return (
        <div className="relative w-full max-w-[100vw] overflow-hidden">
            <ScrollArea className="w-full">
                <div className="min-w-max w-full">
                    <Table >
                        <TableHeader className="bg-gray-200 dark:bg-gray-900">
                            <TableRow>
                                <TableHead>Codigo de Empleado</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Apellido</TableHead>
                                <TableHead>Departamento</TableHead>
                                <TableHead>Cargo</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Opciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((employee)=>(
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.employeeCode}</TableCell>
                                    <TableCell>{employee.firstName}</TableCell>
                                    <TableCell>{employee.lastName}</TableCell>
                                    <TableCell>{employee.department.name}</TableCell>
                                    <TableCell>{employee.position.name}</TableCell>
                                    <TableCell>{employee.state}</TableCell>
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
                                                        setSelectedEmployee(employee);
                                                        setOpenDelete(true);
                                                    }}><Trash2 size={16}/></Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Eliminar Empleado</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </div>
            </ScrollArea>
        </div>
    );
};
  
export default EmployeesTable;