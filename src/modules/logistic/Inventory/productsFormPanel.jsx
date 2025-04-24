'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ProductFormPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Producto</CardTitle>
        <CardDescription>Formulario de creación</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="nombre">Nombre del Producto</Label>
            <Input id="nombre" placeholder="Ej. Monitor HP 24''" />
          </div>

          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" placeholder="Ej. MON-HP24" />
          </div>

          <div>
            <Label htmlFor="unidad">Unidad</Label>
            <Input id="unidad" placeholder="Ej. paquete, caja, unidad." />
          </div>

          <div>
            <Label htmlFor="proveedor">Proveedor</Label>
            <Input id="proveedor" placeholder="Ej. Tech Import S.A." />
          </div>

          <div>
            <Label htmlFor="stockMinimo">Stock Mínimo</Label>
            <Input id="stockMinimo" type="number" placeholder="Ej. 10" />
          </div>

          <div>
            <Label htmlFor="stockMaximo">Stock Máximo</Label>
            <Input id="stockMaximo" type="number" placeholder="Ej. 50" />
          </div>

          <div>
            <Label htmlFor="precio">Precio del Producto</Label>
            <Input id="precio" type="number" step="0.01" placeholder="Ej. 1499.99" />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="categoria">Categoría</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="perifericos">Periféricos</SelectItem>
                <SelectItem value="pantallas">Pantallas</SelectItem>
                <SelectItem value="sillas">Sillas</SelectItem>
                <SelectItem value="otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>

        <div className="flex justify-end">
          <Button>Guardar Producto</Button>
        </div>
      </CardContent>
    </Card>
  );
}