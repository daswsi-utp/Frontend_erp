

import { Badge } from "@/components/ui/badge";

const Stockvalidation = () => {
  
  const stockDisponible = 20;

  return (
    <div className="space-y-2">
      <p className="font-medium">Validación de Stock</p>
      <Badge variant={stockDisponible > 0 ? "default" : "destructive"}>
        {stockDisponible > 0
          ? `Stock disponible: ${stockDisponible}`
          : "Sin stock disponible"}
      </Badge>
    </div>
  );
};

export default Stockvalidation;
