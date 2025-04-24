import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { productsCatalog } from "../config/productsCatalog";

const ProductosForm = ({ productoSeleccionado, setProductoSeleccionado, cantidad, setCantidad, orden, setOrden }) => {
  const agregarProducto = () => {
    if (!productoSeleccionado || cantidad <= 0) return;
    const producto = productsCatalog.find(p => p.id === parseInt(productoSeleccionado));
    if (!producto || cantidad > producto.stock) return alert("Stock insuficiente");
    setOrden([...orden, { ...producto, cantidad }]);
  };

  const subtotal = orden.reduce((sum, item) => sum + item.price * item.cantidad, 0);
  const impuesto = subtotal * 0.18;
  const descuento = subtotal > 200 ? subtotal * 0.1 : 0;
  const total = subtotal + impuesto - descuento;

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h2 className="font-semibold text-xl">Seleccionar Productos / Servicios</h2>
        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <Label>Producto</Label>
            <Select onValueChange={setProductoSeleccionado}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un producto" />
              </SelectTrigger>
              <SelectContent>
                {productsCatalog.map(prod => (
                  <SelectItem key={prod.id} value={prod.id.toString()}>
                    {prod.name} (Stock: {prod.stock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Cantidad</Label>
            <Input type="number" min={1} value={cantidad} onChange={e => setCantidad(Number(e.target.value))} />
          </div>
          <Button onClick={agregarProducto}>Agregar</Button>
        </div>

        <ul className="list-disc ml-6 mt-4">
          {orden.map((item, index) => (
            <li key={index}>{item.name} x{item.cantidad} - S/ {item.price * item.cantidad}</li>
          ))}
        </ul>

        <div className="pt-4">
          <p>Subtotal: S/ {subtotal.toFixed(2)}</p>
          <p>Impuesto (18%): S/ {impuesto.toFixed(2)}</p>
          <p>Descuento: S/ {descuento.toFixed(2)}</p>
          <p className="font-bold">Total: S/ {total.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductosForm;
