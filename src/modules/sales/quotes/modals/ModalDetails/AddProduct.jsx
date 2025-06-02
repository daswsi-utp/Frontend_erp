import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Productos de ejemplo
const sampleProducts = [
  { id: 101, name: "Producto A", price: 150 },
  { id: 102, name: "Producto B", price: 300 },
  { id: 103, name: "Producto C", price: 450 }
];

const AddProduct = ({ onAddProduct }) => {
  const [products, setProducts] = useState([
    { productId: "", amount: 1, prize: 0, discount: 0, tax: 18 }
  ]);

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] =
      ["amount", "prize", "discount", "tax"].includes(field)
        ? parseFloat(value) || 0
        : value;

    if (field === "productId") {
      const selected = sampleProducts.find(p => p.id.toString() === value);
      if (selected) {
        updated[index].prize = selected.price;
      }
    }

    setProducts(updated);
  };

  const addProductRow = () => {
    setProducts([...products, { productId: "", amount: 1, prize: 0, discount: 0, tax: 18 }]);
  };

  const removeProductRow = (index) => {
    if (products.length > 1) {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
    }
  };

  const handleSubmit = () => {
  const validProducts = products
    .filter(p => p.productId && p.amount > 0 && p.prize >= 0)
    .map(product => ({
      productId: Number(product.productId),
      amount: Number(product.amount),
      prize: Number(product.prize),
      discount: Number(product.discount),
      tax: Number(product.tax)
    }));

  if (validProducts.length === 0) {
    alert("No hay productos válidos para agregar");
    return;
  }

  if (typeof onAddProduct === 'function') {
    onAddProduct(validProducts);
  } else {
    console.error('onAddProduct no es una función');
  }
};


  

  return (
    <div className="p-4">
      <h3 className="font-medium mb-2">Detalles de Productos</h3>

      {products.map((product, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 mb-3 items-end">
          <div className="col-span-4">
            <label className="text-sm font-medium">Producto</label>
            <Select
              value={product.productId}
              onValueChange={(value) => handleProductChange(index, "productId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione producto" />
              </SelectTrigger>
              <SelectContent>
                {sampleProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} - ${product.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Cantidad</label>
            <Input
              type="number"
              min="1"
              value={product.amount}
              onChange={(e) => handleProductChange(index, "amount", e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Precio</label>
            <Input
              type="number"
              min="0"
              value={product.prize}
              onChange={(e) => handleProductChange(index, "prize", e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Descuento (%)</label>
            <Input
              type="number"
              min="0"
              max="100"
              value={product.discount}
              onChange={(e) => handleProductChange(index, "discount", e.target.value)}
            />
          </div>

          <div className="col-span-2 flex justify-end">
            <Button variant="ghost" onClick={() => removeProductRow(index)}>Eliminar</Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={addProductRow}>
          Añadir Producto
        </Button>
        <Button onClick={handleSubmit}>Guardar productos</Button>
      </div>
    </div>
  );
};

export default AddProduct;
