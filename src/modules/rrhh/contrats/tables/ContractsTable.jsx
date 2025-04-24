'use client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, Users, SquarePen } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const ContractsTable = ({ contracts, setSelectedContract, setSelectedFile, setOpenEdit, setOpenDelete, setOpenContract }) => {

  const columns = [
    { key: 'index', label: 'Id', className: 'w-10' },
    { key: 'employee', label: 'Empleado' },
    { key: 'type', label: 'Tipo de contrato' },
    { key: 'startDate', label: 'Inicio de contrato' },
    { key: 'endDate', label: 'Fin de contrato' },
    { key: 'status', label: 'Estado' },
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
                    {contracts.length > 0 ? (
                        contracts.map((contract) => (
                        <TableRow key={contract.id || contract.index}>
                            <TableCell>{contract.id}</TableCell>
                            <TableCell>{contract.employee.firstName} {contract.employee.lastName}</TableCell>
                            <TableCell>{contract.type}</TableCell>
                            <TableCell>
                                {new Date(contract.startDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {new Date(contract.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Badge className={`${typeColorVariants[
                                    contract.status === 'ACTIVO' ? 'green' :
                                    contract.status === 'FINALIZADO' ? 'orange' :
                                    'red'
                                    ]} text-xs w-fit`}>{contract.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" 
                                    onClick={() => {
                                        setSelectedFile(contract.file);
                                        setOpenContract(true);
                                    }}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="destructive" onClick={() => {
                                    setSelectedContract(contract);
                                    setOpenDelete(true);
                                }}><Trash2 size={16}/></Button>
                                <Button variant="link" onClick={() => {
                                    setSelectedContract(contract);
                                    setOpenEdit(true);
                                }}><SquarePen size={16}/></Button>
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

export default ContractsTable;