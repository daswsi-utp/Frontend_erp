'use client';
import { useState, useMemo } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, Search, SquarePen } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from '@/components/ui/input'

const ContractsTable = ({ contracts, setSelectedContract, deleteContract, setOpenEdit, setOpenDelete, setOpenContract }) => {
  
  const [searchTerm, setSearchTerm] = useState('')
  const [searchState, setSearchState] = useState('todos')

  const filteredContracts = useMemo(() => {
    if (!searchTerm && !searchState) return contracts
    return contracts.filter(contract => {
      const matchesName =
        !searchTerm ||
        contract.employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.employee.lastName.toLowerCase().includes(searchTerm.toLowerCase());
  
      const matchesState =
        searchState === 'todos' ||
        contract.state?.toLowerCase() === searchState.toLowerCase()
  
      return matchesName && matchesState;
    });
  }, [contracts, searchTerm, searchState])

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
    VIGENTE: 'bg-green-300 text-green-800',
    SUSPENDIDO: 'bg-yellow-300 text-yellow-800',
    RENOVADO: 'bg-green-300 text-green-800',
    VENCIDO: 'bg-orange-300 text-orange-800',
    RESCINDIDO: 'bg-red-300 text-red-800',
    FINALIZADO: 'bg-red-300 text-red-800',
    ARCHIVADO: 'bg-red-300 text-red-800'
  };

return (
  <div className="relative w-full max-w-[100vw] overflow-hidden">
    <ScrollArea className="w-full">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar contrato por nombre"
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
                <SelectItem value="vigente">Vigente</SelectItem>
                <SelectItem value="suspendido">Suspendido</SelectItem>
                <SelectItem value="renovado">Renovado</SelectItem>
                <SelectItem value="vencido">Vencido</SelectItem>
                <SelectItem value="rescindido">Rescindido</SelectItem>
                <SelectItem value="finalizado">Finalizado</SelectItem>
                <SelectItem value="archivado">Archivado</SelectItem>
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
            {filteredContracts.length > 0 ? (
              filteredContracts.map((contract) => (
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
                    <Badge className={`${typeColorVariants[contract.state]} text-xs w-fit`}>
                      {contract.state}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" 
                      onClick={() => {
                        setSelectedContract(contract);
                        setOpenContract(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" onClick={() => {
                      deleteContract(contract);
                    }}><Trash2 size={16}/></Button>
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