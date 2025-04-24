

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Quotesummary = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Resumen de Cotización</h2>
      <div className="space-y-2">
        <Label htmlFor="producto">Producto</Label>
        <Input id="producto" disabled value="Producto X" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cantidad">Cantidad</Label>
        <Input id="cantidad" type="number" defaultValue={1} min={1} />
      </div>
    </div>
  );
};

export default Quotesummary;
