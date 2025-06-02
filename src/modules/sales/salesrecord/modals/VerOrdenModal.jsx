'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, FileText, Calendar, Box, DollarSign, CreditCard, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const VerOrdenModal = ({ open, onOpenChange, orden }) => {
  // Datos de ejemplo para productos y pagos
  const productos = [
    { nombre: "Mesa de roble", cantidad: 2, precioUnitario: 450, subtotal: 900 },
    { nombre: "Sillas", cantidad: 6, precioUnitario: 120, subtotal: 720 },
    { nombre: "Barniz especial", cantidad: 1, precioUnitario: 85, subtotal: 85 }
  ];

  const total = productos.reduce((sum, item) => sum + item.subtotal, 0);
  const iva = total * 0.16;
  const totalFinal = total + iva;

  const getEstadoIcon = () => {
    switch(orden?.estado) {
      case "Finalizada": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "En proceso": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Cancelada": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Orden OP-{orden?.id.toString().padStart(4, '0')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Box className="h-4 w-4" /> Producto principal
            </h3>
            <p>{orden?.producto}</p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
            <p>{orden?.cliente}</p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Fecha de entrega
            </h3>
            <p>{orden?.fecha}</p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
            <div className="flex items-center gap-2">
              {getEstadoIcon()}
              <Badge variant={
                orden?.estado === "Finalizada" ? "success" :
                orden?.estado === "En proceso" ? "warning" :
                "destructive"
              }>
                {orden?.estado}
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Package className="h-4 w-4" /> Detalle de productos
          </h3>
          
          <div className="border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Producto</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Cantidad</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">P. Unitario</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productos.map((producto, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm">{producto.nombre}</td>
                    <td className="px-4 py-2 text-sm">{producto.cantidad}</td>
                    <td className="px-4 py-2 text-sm">{formatCurrency(producto.precioUnitario)}</td>
                    <td className="px-4 py-2 text-sm font-medium">{formatCurrency(producto.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Separator className="my-2" />

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <h3 className="text-muted-foreground">Subtotal</h3>
              <p>{formatCurrency(total)}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-muted-foreground">IVA (16%)</h3>
              <p>{formatCurrency(iva)}</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Total a pagar</h3>
              <p className="text-lg font-semibold">{formatCurrency(totalFinal)}</p>
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4" />
            <span className="text-muted-foreground">Método de pago:</span>
            <span>{orden?.metodoPago || "Pendiente de definir"}</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
            <Button variant="default" size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Registrar Pago
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerOrdenModal;