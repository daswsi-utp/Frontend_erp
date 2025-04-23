'use client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Phone, Users } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const PermisionsTable = ({ permisions, setSelectedVacation, setOpenEdit, setOpenDelete }) => {

  const columns = [
    { key: 'index', label: 'Id', className: 'w-10' },
    { key: 'employee', label: 'Empleado' },
    { key: 'startDate', label: 'Día de Inicio' },
    { key: 'endDate', label: 'Día de Fin' },
    { key: 'daysTaken', label: 'Dias Tomados' },
    { key: 'status', label: 'Estado' },
    { key: 'requestedAt', label: 'Fecha de Solicitud' },
    { key: 'type', label: 'Tipo de Permiso' },
    { key: 'options', label: 'Opciones' }
  ];

  const typeColorVariants = {
    green: 'bg-green-100 text-green-800',
    orange: 'bg-orange-100 text-orange-800',
    red: 'bg-red-100 text-red-800'
  };

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
        <ScrollArea className="w-full">
             <div className="min-w-max w-full">
                <Table>
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
                    {permisions.length > 0 ? (
                        permisions.map((permision) => (
                        <TableRow key={permision.id || permision.index}>
                            <TableCell>{permision.id}</TableCell>
                            <TableCell>{permision.employee.firstName} {permision.employee.lastName}</TableCell>
                            <TableCell>
                                {new Date(permision.startDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {new Date(permision.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{permision.daysTaken}</TableCell>
                            <TableCell>
                                <Badge className={`${typeColorVariants[
                                    permision.status === 'APROVADO' ? 'green' :
                                    permision.status === 'PENDIENTE' ? 'orange' :
                                    'red'
                                    ]} text-xs w-fit`}>{permision.status}</Badge>
                            </TableCell>
                            <TableCell>
                                {new Date(permision.requestedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {permision.type}
                            </TableCell>
                            <TableCell>
                            <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
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

export default PermisionsTable;