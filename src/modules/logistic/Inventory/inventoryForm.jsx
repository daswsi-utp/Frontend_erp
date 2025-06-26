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

  const { getModel, postModel } = useCrud(""); // Base path vacía, usamos rutas completas

  const [providers, setProviders] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (initialData?.id) {
      getModel(`/logistic/inventory/${initialData.id}`)
        .then((invData) => {
          setForm((prev) => ({
            ...prev,
            ...initialData,
            stock: invData.stock,
            stock_minimo: invData.stock_minimo,
            stock_maximo: invData.stock_maximo,
            ubicacion: invData.ubicacion,
            estado_stock: invData.estado_stock,
          }));
        })
        .catch(console.error);
    } else if (initialData) {
      setForm((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prov, suc] = await Promise.all([
          getModel("/logistic/providers"),
          getModel("/logistic/branches"),
        ]);
        setProviders(prov);
        setBranches(suc);
      } catch (error) {
        console.error("Error cargando proveedores o sucursales:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear producto
      const newProduct = await postModel("/logistic/products", {
        sku: form.sku,
        nombre: form.nombre,
        marca: form.marca,
        precio: parseFloat(form.precio),
        proveedor: form.proveedor,
      });

      // Enviar datos del inventario
      await onSubmit({
        producto_id: newProduct.id,
        stock: parseInt(form.stock),
        stock_minimo: parseInt(form.stock_minimo),
        stock_maximo: parseInt(form.stock_maximo),
        ubicacion: form.ubicacion,
        estado_stock: form.estado_stock,
        sucursal_nombre: form.sucursal_nombre,
      });

      // Limpiar el formulario
      setForm({
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
    } catch (error) {
      console.error("Error al crear producto o inventario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campos del producto */}
      {["sku", "nombre", "marca"].map((field) => (
        <div key={field}>
          <Label>{field.toUpperCase()}</Label>
          <Input
            name={field}
            value={form[field] || ""}
            onChange={handleChange}
            required
          />
        </div>
      ))}

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
              <SelectItem key={p.id_proveedor || p.id} value={p.nombre}>
                {p.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Campos del inventario */}
      {["ubicacion", "stock", "stock_minimo", "stock_maximo"].map((field) => (
        <div key={field}>
          <Label>{field.replace("_", " ").toUpperCase()}</Label>
          <Input
            type={field === "ubicacion" ? "text" : "number"}
            name={field}
            value={form[field] || ""}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      {/* Precio */}
      <div>
        <Label>PRECIO</Label>
        <Input
          type="number"
          name="precio"
          step="0.01"
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