// src/modules/sales/register/pricecomparison.tsx

import { Input } from "@/components/ui/input";

const ComparacionPrecios = () => {
  return (
    <div className="space-y-2">
      <label className="font-medium">Comparación de Precios Históricos</label>
      <Input placeholder="Buscar productos o servicios" />
      <div className="bg-muted p-4 rounded-lg text-sm">
        {/* Simulación de precios */}
        Ejemplo: Producto X - Últimos precios: S/100, S/95, S/97
      </div>
    </div>
  );
};

export default ComparacionPrecios;
