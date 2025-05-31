'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package } from 'lucide-react';
//nuevo
import { Trash2 } from "lucide-react";

const ProductDetailsModal = ({ open, onClose, products = [] , onDeleteProduct}) => {

    const handleDelete = async (productId) =>{
        try{
            await onDeleteProduct(productId);
        }catch(error)
        {
            console.error("Error al eliminar:",error);
        }
    }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <DialogTitle>Detalles de Productos</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {products.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Precio Unitario</TableHead>
                  <TableHead className="text-right">Descuento</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.product?.name || `Producto ${product.productId}`}
                    </TableCell>
                    <TableCell className="text-right">{product.amount}</TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(product.prize)}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(product.discount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format((product.prize * product.amount) - product.discount)}
                    </TableCell>
                     <TableCell className="text-right">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(product.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center py-4">No hay productos en esta cotización</p>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;