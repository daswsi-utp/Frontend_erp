'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductFilters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Nombre del producto */}
      <div>
        <Label>Producto</Label>
        <Input placeholder="Buscar por nombre" />
      </div>

      {/* SKU */}
      <div>
        <Label>SKU</Label>
        <Input placeholder="Ej. MON-HP24" />
      </div>

      {/* Categoría */}
      <div>
        <Label>Categoría</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="perifericos">Periféricos</SelectItem>
            <SelectItem value="pantallas">Pantallas</SelectItem>
            <SelectItem value="sillas">Sillas</SelectItem>
            <SelectItem value="otros">Otros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Proveedor */}
      <div>
        <Label>Proveedor</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tech Import S.A.">Tech Import S.A.</SelectItem>
            <SelectItem value="Global Tech">Global Tech</SelectItem>
            <SelectItem value="Distribuciones XYZ">Distribuciones XYZ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Unidad */}
      <div>
        <Label>Unidad</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unidad">Unidad</SelectItem>
            <SelectItem value="caja">Caja</SelectItem>
            <SelectItem value="paquete">Paquete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stock actual */}
      <div>
        <Label>Stock actual</Label>
        <Input type="number" placeholder="Ej. >= 10" />
      </div>

      {/* Stock mínimo */}
      <div>
        <Label>Stock mínimo</Label>
        <Input type="number" placeholder="Ej. <= 5" />
      </div>

      {/* Stock máximo */}
      <div>
        <Label>Stock máximo</Label>
        <Input type="number" placeholder="Ej. <= 50" />
      </div>

      {/* Precio */}
      <div>
        <Label>Precio</Label>
        <Input type="number" placeholder="Ej. <= 1000" />
      </div>

      {/* Estado de stock */}
      <div>
        <Label>Estado de stock</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bajo">Bajo</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="excedente">Excedente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}