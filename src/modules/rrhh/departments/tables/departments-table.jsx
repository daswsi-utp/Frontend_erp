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
import Link from 'next/link'

const DepartmentsTable = ({ data, setSelectedDepartment, setOpenEdit, setOpenDelete }) => {

    return (
        <div className="relative w-full max-w-[100vw] overflow-hidden">
            <ScrollArea className="w-full">
                <div className="min-w-max w-full">
                    <Table >
                        <TableHeader className="bg-gray-200 dark:bg-gray-900">
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Encargado</TableHead>
                                <TableHead>Codigo</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Opciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((department)=>(
                                <TableRow key={department.id}>
                                    <TableCell>{department.id}</TableCell>
                                    <TableCell>{department.name}</TableCell>
                                    <TableCell>{department.manager}</TableCell>
                                    <TableCell>{department.code}</TableCell>
                                    <TableCell>{department.state}</TableCell>
                                    <TableCell className="w-32">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="link" onClick={() => {
                                                        setSelectedDepartment(department);
                                                        setOpenEdit(true);
                                                    }}><SquarePen size={16}/></Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                <p>Editar Departamento</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="destructive" onClick={() => {
                                                        setSelectedDepartment(department);
                                                        setOpenDelete(true);
                                                    }}><Trash2 size={16}/></Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                <p>Eliminar Departamento</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Link href={`/rrhh/departments/positions/${encodeURIComponent(department.code)}`}><BookUser size={16} className="mx-3"/></Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                <p>Cargos de {department.name}</p>
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
  
export default DepartmentsTable;