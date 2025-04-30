'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const VerOrdenModal = ({ open, onOpenChange, orden }) => {
  const getEstadoIcon = () => {
    switch(orden?.estado) {
      case "Finalizada": return <CheckCircle className="text-green-500" />;
      case "En proceso": return <Clock className="text-yellow-500" />;
      case "Cancelada": return <XCircle className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalles de Orden OP-{orden?.id}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
            <p>{orden?.cliente}</p>
          </div>
          
          <div>
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
          
          {/* Más campos de la orden... */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerOrdenModal;