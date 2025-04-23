"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CalendarIcon, Trash } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const NewQuoteForm = () => {
  const router = useRouter();

  const [client, setClient] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("pending");

  // Productos
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 1, price: 0 });

  const addProduct = () => {
    if (!newProduct.name || newProduct.quantity <= 0 || newProduct.price <= 0) {
      alert("Por favor, completa correctamente los datos del producto.");
      return;
    }

    setProducts([...products, newProduct]);
    setNewProduct({ name: "", quantity: 1, price: 0 });
  };

  const removeProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const total = products.reduce((sum, p) => sum + p.quantity * p.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!client || products.length === 0) {
      alert("Por favor, ingresa un cliente y agrega productos.");
      return;
    }

    console.log({
      client,
      date,
      status,
      products,
      total,
    });

    router.push("/sales/quotes");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Nueva Cotización</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Cliente</Label>
              <Input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {date ? format(date, "PPP") : "Selecciona una fecha"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Estado</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="approved">Aprobada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Productos</Label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Input
                  placeholder="Producto"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Cantidad"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      quantity: Math.max(1, Number(e.target.value)),
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Precio"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: Math.max(0, Number(e.target.value)),
                    })
                  }
                />
              </div>
              <Button type="button" onClick={addProduct} className="mb-4">
                Agregar Producto
              </Button>

              {products.length > 0 && (
                <div className="space-y-2">
                  {products.map((p, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border rounded p-2"
                    >
                      <div className="flex-1">
                        <div className="text-sm">{p.name}</div>
                        <div className="text-xs text-gray-500">
                          {p.quantity} × S/{p.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="font-bold">
                          S/{(p.quantity * p.price).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(index)}
                        >
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-right text-lg font-semibold">
              <div>Total: S/{total.toFixed(2)}</div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Guardar Cotización</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewQuoteForm;
