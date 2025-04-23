import { Checkbox } from "@/components/ui/checkbox";

const FirmaAprobacion = () => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="aprobacion" />
      <label htmlFor="aprobacion" className="text-sm">Aprobar cotización</label>
    </div>
  );
};

export default approvalsignatureregister;
