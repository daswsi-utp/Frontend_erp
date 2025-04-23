import { Textarea } from "@/components/ui/textarea";

const Comentarios = () => {
  return (
    <div className="space-y-2">
      <label className="font-medium">Comentarios o motivo de rechazo</label>
      <Textarea placeholder="Ingrese sus comentarios aquí..." />
    </div>
  );
};

export default commentregister;