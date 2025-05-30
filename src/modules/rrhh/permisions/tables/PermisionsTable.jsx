'use client';
import { useState, useMemo } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Trash2, SquarePen } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from '@/components/ui/input'


const PermisionsTable = ({ permisions, setSelectedPermision, setOpenEdit, deletePermission }) => {

  const [searchTerm, setSearchTerm] = useState('')
  const [searchState, setSearchState] = useState('todos')

  const filteredPermisions = useMemo(() => {
    if (!searchTerm && !searchState) return permisions
    return permisions.filter(permision => {
      const matchesName =
        !searchTerm ||
        permision.employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permision.employee.lastName.toLowerCase().includes(searchTerm.toLowerCase());
  
      const matchesState =
        searchState === 'todos' ||
        permision.state?.toLowerCase() === searchState.toLowerCase()
  
      return matchesName && matchesState;
    });
  }, [permisions, searchTerm, searchState])

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
    SOLICITADO: 'bg-yellow-300 text-green-800',
    APROBADO: 'bg-green-300 text-green-800',
    RECHAZADO: 'bg-red-300 text-green-800',
    EN_PROGRESO: 'bg-orange-300 text-green-800',
    FINALIZADO: 'bg-red-300 text-red-800'
  };

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
        <ScrollArea className="w-full">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar departamento por nombre"
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
                    <SelectItem value="solicitado">Solicitado</SelectItem>
                    <SelectItem value="aprobado">Aprobado</SelectItem>
                    <SelectItem value="rechazado">Rechazado</SelectItem>
                    <SelectItem value="en_proceso">En Proceso</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="min-w-max w-full rounded-md border">
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
                {filteredPermisions.length > 0 ? (
                  filteredPermisions.map((permision) => (
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
                           <Badge className={`${typeColorVariants[permision.state]} text-xs w-fit`}>
                              {permision.state?.replaceAll("_", " ")}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {new Date(permision.requestAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            {permision.type?.replaceAll("_", " ")}
                        </TableCell>
                        <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => {
                                setSelectedPermision(permision);
                                setOpenEdit(true);
                            }}><SquarePen className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => {
                                deletePermission(permision);
                            }}><Trash2 className="h-4 w-4" />
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