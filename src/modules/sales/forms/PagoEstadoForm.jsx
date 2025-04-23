import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PagoEstadoForm = ({ metodoPago, setMetodoPago, estado, setEstado }) => (
  <Card>
    <CardContent className="space-y-4 pt-6">
      <h2 className="font-semibold text-xl">Método de Pago y Estado</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Método de Pago</Label>
          <Select value={metodoPago} onValueChange={setMetodoPago}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="efectivo">Efectivo</SelectItem>
              <SelectItem value="tarjeta">Tarjeta</SelectItem>
              <SelectItem value="pasarela">Pasarela</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Estado</Label>
          <Tabs value={estado} onValueChange={setEstado}>
            <TabsList>
              <TabsTrigger value="Pendiente">Pendiente</TabsTrigger>
              <TabsTrigger value="Enviado">Enviado</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default PagoEstadoForm;
