"use client"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input'
import { Trash2, SquarePen, Search } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'



const DepartmentsTable = ({ data, setSelectedDepartment, setOpenEdit, deleteDepartment }) => {

  const [searchTerm, setSearchTerm] = useState('')
  const [searchState, setSearchState] = useState('')

  const filteredDepartments = useMemo(() => {
    if (!searchTerm && !searchState) return data
    return data.filter(department => {
      const matchesName =
        !searchTerm ||
        department.name.toLowerCase().includes(searchTerm.toLowerCase())
  
      const matchesState =
        searchState === 'todos' ||
        department.state?.toLowerCase() === searchState.toLowerCase()
  
      return matchesName && matchesState;
    });
  }, [data, searchTerm, searchState])

  const columns = [
    { key: 'index', label: 'ID', className: 'w-10' },
    { key: 'name', label: 'Nombre' },
    { key: 'code', label: 'Codigo' },
    { key: 'state', label: 'Estado' },
    { key: 'options', label: 'Opciones' }
  ];
  const typeColorVariants = {
    ACTIVO: 'bg-green-300 text-green-800',
    INACTIVO: 'bg-red-300 text-red-800'
  }

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
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
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
                      {filteredDepartments.length > 0 ? (
                          filteredDepartments.map((department) => (
                            <TableRow key={department.id}>
                                <TableCell>{department.id}</TableCell>
                                <TableCell>{department.name}</TableCell>
                                <TableCell>{department.code}</TableCell>
                                <TableCell>
                                  <Badge className={`${typeColorVariants[department.state]} text-xs w-fit`}>
                                    {department.state}
                                  </Badge>
                                </TableCell>
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
                                                    deleteDepartment(department);
                                                }}><Trash2 size={16}/></Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                            <p>Eliminar Departamento</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
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
  
export default DepartmentsTable;