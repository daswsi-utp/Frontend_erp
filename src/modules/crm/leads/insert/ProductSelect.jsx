import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"; // Asegúrate de usar las importaciones correctas

const ProductSelect = ({ value, onChange, listProducts }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona un Producto" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Producto</SelectLabel>
          {listProducts.map((product) => (
            <SelectItem key={product.id} value={product.id}>
              {product.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default ProductSelect;
