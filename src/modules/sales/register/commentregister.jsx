

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const commentregister = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="comentarios">Comentarios o motivo de rechazo</Label>
      <Textarea id="comentarios" placeholder="Ingrese sus comentarios aquí..." />
    </div>
  );
};

export default commentregister;
