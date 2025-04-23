import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ClienteForm = ({ cliente, setCliente }) => (
  <Card>
    <CardContent className="space-y-4 pt-6">
      <h2 className="font-semibold text-xl">Datos del Cliente</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Nombre</Label>
          <Input value={cliente.nombre} onChange={e => setCliente({ ...cliente, nombre: e.target.value })} />
        </div>
        <div>
          <Label>Contacto</Label>
          <Input value={cliente.contacto} onChange={e => setCliente({ ...cliente, contacto: e.target.value })} />
        </div>
        <div>
          <Label>Dirección</Label>
          <Input value={cliente.direccion} onChange={e => setCliente({ ...cliente, direccion: e.target.value })} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ClienteForm;
