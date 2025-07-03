import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCrud from "@/hooks/useCrud";

export default function InventoryForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    sku: "",
    nombre: "",
    marca: "",
    precio: "",
    proveedor: "",
    stock: "",
    stock_minimo: "",
    stock_maximo: "",
    ubicacion: "",
    sucursal_nombre: "",
    estado_stock: "",
  });

  const { getModel: getProviders } = useCrud("/logistic/providers");
  const { getModel: getBranches } = useCrud("/logistic/branches");
  const { getModel: getInventory } = useCrud("/logistic/inventory");
  const { addItem: addProduct } = useCrud("/logistic/products");

  const [providers, setProviders] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (initialData?.id) {
      getInventory(initialData.id)
        .then((invData) =>
          setForm((prev) => ({
            ...prev,
            ...initialData,
            stock: invData.stock,
            stock_minimo: invData.stock_minimo,
            stock_maximo: invData.stock_maximo,
            ubicacion: invData.ubicacion,
            estado_stock: invData.estado_stock,
          }))
        )
        .catch(console.error);
    } else if (initialData) {
      setForm((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  useEffect(() => {
    getProviders().then(setProviders).catch(console.error);
    getBranches().then(setBranches).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear producto primero
      const newProduct = await addProduct({
        sku: form.sku,
        nombre: form.nombre,
        marca: form.marca,
        precio: parseFloat(form.precio),
        proveedor: form.proveedor,
      });

      // Luego enviar datos de inventario al callback
      onSubmit({
        producto_id: newProduct.id,
        stock: parseInt(form.stock),
        stock_minimo: parseInt(form.stock_minimo),
        stock_maximo: parseInt(form.stock_maximo),
        ubicacion: form.ubicacion,
        estado_stock: form.estado_stock,
        sucursal_nombre: form.sucursal_nombre,
      });
    } catch (error) {
      console.error("Error al crear producto o inventario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campos básicos del producto */}
      {["sku", "nombre", "marca"].map((field) => (
        <div key={field}>
          <Label>{field}</Label>
          <Input
            name={field}
            value={form[field] || ""}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      {/* Select de sucursal */}
      <div>
        <Label>Sucursal</Label>
        <Select
          value={form.sucursal_nombre}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, sucursal_nombre: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una sucursal" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((b) => (
              <SelectItem key={b.id} value={b.nombre}>
                {b.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select de proveedor */}
      <div>
        <Label>Proveedor</Label>
        <Select
          value={form.proveedor}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, proveedor: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un proveedor" />
          </SelectTrigger>
          <SelectContent>
            {providers.map((p) => (
              <SelectItem key={p.id} value={p.nombre}>
                {p.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Campos del inventario */}
      {["ubicacion", "stock", "stock_minimo", "stock_maximo"].map((field) => (
        <div key={field}>
          <Label>{field}</Label>
          <Input
            type={field === "ubicacion" ? "text" : "number"}
            name={field}
            value={form[field] || ""}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      {/* Campo precio */}
      <div>
        <Label>Precio</Label>
        <Input
          type="number"
          name="precio"
          value={form.precio || ""}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Guardar
      </Button>
    </form>
  );
}