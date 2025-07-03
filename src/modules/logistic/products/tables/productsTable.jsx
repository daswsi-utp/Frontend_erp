"use client"
import { useState, useMemo } from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Trash2, SquarePen, Search, ShieldCheck } from 'lucide-react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


const ProductsTable = ({ data, isLoading, setSelectedProduct, setOpenEdit, deleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchState, setSearchState] = useState('')
  
  const filteredProducts = useMemo(() => {
    if (!data) return []
    if (!searchTerm && !searchState) return data
    return data.filter(product => {
      const matchesName =
        !searchTerm ||
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.marca.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesName;
    });
  }, [data, searchTerm])
  
  const columns = [
      { key: 'sku', label: 'Stock Keeping Unit' },
      { key: 'description', label: 'Nombre' },
      { key: 'marca', label: 'Marca' },
      { key: 'precio', label: 'Precio' },
      { key: 'proveedor', label: 'Proveedor' },
      { key: 'options', label: 'Opciones' }
  ];

  if (isLoading) {
    return (
      <div className="w-full py-10 flex justify-center items-center">
        <p className="text-gray-500 dark:text-gray-300">Cargando productos...</p>
      </div>
    )
  }

  return (
      <div className="relative w-full max-w-[100vw] overflow-hidden">
        <ScrollArea className="w-full">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar producto por nombre o marca"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.descripcion}</TableCell>
                    <TableCell>{product.marca}</TableCell>
                    <TableCell>{product.precio}</TableCell>
                    <TableCell>{product.proveedor?.nombre}</TableCell>
                    <TableCell className="w-32">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="link" onClick={() => {
                              setSelectedProduct(product);
                              setOpenEdit(true);
                            }}><SquarePen size={16}/></Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar Producto</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="destructive" onClick={() => {
                                deleteProduct(product);
                            }}><Trash2 size={16}/></Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar Producto</p>
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
  
export default ProductsTable;