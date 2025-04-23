// src/modules/sales/order/MetodoPagoSelector.tsx

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const paymentmethod = () => {
  return (
    <div className="space-y-2">
      <Label>Método de Pago</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccione un método de pago" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="contado">Contado</SelectItem>
          <SelectItem value="credito">Crédito</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default paymentmethod;
