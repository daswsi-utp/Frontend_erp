'use client'

import React from 'react'
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const ProductTable = ({ products = [], handleOpenModal }) => {
 return (
  <Table>
   <TableHeader>
    <TableRow>
     <TableHead>#</TableHead>
     <TableHead>Nombre</TableHead>
     <TableHead>Código</TableHead>
     <TableHead>Precio</TableHead>
     <TableHead>Acciones</TableHead>
    </TableRow>
   </TableHeader>
   <TableBody>
    {(!products || products.length === 0) ? (
     <TableRow>
      <TableCell colSpan={5} className="text-center">
       No hay productos
      </TableCell>
     </TableRow>
    ) : (
     products.map((product, index) => (
      <TableRow key={product.id}>
       <TableCell>{index + 1}</TableCell>
       <TableCell>{product.name}</TableCell>
       <TableCell>{product.code}</TableCell>
       <TableCell>{product.price}</TableCell>
       <TableCell>
        <Button
         size="sm"
         variant="outline"
         onClick={() => handleOpenModal('edit', product)}
        >
         Editar
        </Button>
       </TableCell>
      </TableRow>
     ))
    )}
   </TableBody>
  </Table>
 )
}

export default ProductTable
