// src/modules/sales/register/approvalsignatureregister.tsx

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FirmaAprobacion = () => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="aprobacion" />
      <Label htmlFor="aprobacion">Aprobar cotización</Label>
    </div>
  );
};

export default FirmaAprobacion;
