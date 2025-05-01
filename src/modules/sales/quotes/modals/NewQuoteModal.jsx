'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

// Datos de ejemplo (deberías reemplazarlos con llamadas a tu API)
const sampleProducts = [
  { id: 1, name: "Producto A", price: 100 },
  { id: 2, name: "Producto B", price: 200 },
  { id: 3, name: "Producto C", price: 300 }
];

const sampleClients = [
  { id: 1, name: "Cliente X" },
  { id: 2, name: "Cliente Y" },
  { id: 3, name: "Cliente Z" }
];

const paymentMethods = [
  { id: 1, name: "Efectivo" },
  { id: 2, name: "Tarjeta Crédito" },
  { id: 3, name: "Transferencia" }
];

const NewQuoteModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    clientId: "",
    date: new Date().toISOString().split('T')[0],
    expirationDate: "",
    tax: 18,
    paymentMethod: "",
    status: "pendiente"
  });

  const [products, setProducts] = useState([
    { productId: "", quantity: 1, price: 0, discount: 0 }
  ]);

  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // Calcular totales cuando cambian los productos
  useEffect(() => {
    const newSubtotal = products.reduce((sum, item) => {
      return sum + (item.price * item.quantity - item.discount);
    }, 0);
    
    const newTaxAmount = newSubtotal * (form.tax / 100);
    const newTotal = newSubtotal + newTaxAmount;
    
    setSubtotal(newSubtotal);
    setTaxAmount(newTaxAmount);
    setTotal(newTotal);
  }, [products, form.tax]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = field === 'quantity' || field === 'price' || field === 'discount' 
      ? parseFloat(value) || 0 
      : value;
    
    // Actualizar precio si se selecciona un producto nuevo
    if (field === 'productId') {
      const selectedProduct = sampleProducts.find(p => p.id.toString() === value);
      if (selectedProduct) {
        newProducts[index].price = selectedProduct.price;
      }
    }
    
    setProducts(newProducts);
  };

  const addProductRow = () => {
    setProducts([...products, { productId: "", quantity: 1, price: 0, discount: 0 }]);
  };

  const removeProductRow = (index) => {
    if (products.length > 1) {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
    }
  };

  const handleSubmit = () => {
    const newQuote = {
      id: Date.now(),
      clientId: form.clientId,
      date: form.date,
      expirationDate: form.expirationDate,
      tax: form.tax,
      paymentMethod: form.paymentMethod,
      status: form.status,
      subtotal,
      taxAmount,
      total,
      products: products.map(p => ({
        productId: p.productId,
        productName: sampleProducts.find(prod => prod.id.toString() === p.productId)?.name || "",
        quantity: p.quantity,
        price: p.price,
        discount: p.discount,
        subtotal: (p.price * p.quantity) - p.discount
      }))
    };
    
    onSave(newQuote);
    // Reset form
    setForm({
      clientId: "",
      date: new Date().toISOString().split('T')[0],
      expirationDate: "",
      tax: 18,
      paymentMethod: "",
      status: "pendiente"
    });
    setProducts([{ productId: "", quantity: 1, price: 0, discount: 0 }]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nueva Cotización</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Sección de cabecera */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cliente</label>
              <Select 
                value={form.clientId} 
                onValueChange={(value) => setForm({...form, clientId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un cliente" />
                </SelectTrigger>
                <SelectContent>
                  {sampleClients.map(client => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fecha</label>
              <Input 
                type="date" 
                name="date" 
                value={form.date} 
                onChange={handleFormChange} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fecha de Vencimiento</label>
              <Input 
                type="date" 
                name="expirationDate" 
                value={form.expirationDate} 
                onChange={(e) => setForm({...form, expirationDate: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Impuesto (%)</label>
              <Input 
                type="number" 
                name="tax" 
                value={form.tax} 
                onChange={handleFormChange} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Método de Pago</label>
              <Select 
                value={form.paymentMethod} 
                onValueChange={(value) => setForm({...form, paymentMethod: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione método" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map(method => (
                    <SelectItem key={method.id} value={method.id.toString()}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <Select 
                value={form.status} 
                onValueChange={(value) => setForm({...form, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="aprobada">Aprobada</SelectItem>
                  <SelectItem value="rechazada">Rechazada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Sección de productos */}
          <div className="mt-6">
            <h3 className="font-medium mb-2">Productos/Servicios</h3>
            
            {products.map((product, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 mb-3 items-end">
                <div className="col-span-5">
                  <label className="block text-sm font-medium mb-1">Producto</label>
                  <Select
                    value={product.productId}
                    onValueChange={(value) => handleProductChange(index, 'productId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleProducts.map(product => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name} - ${product.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Cantidad</label>
                  <Input
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Precio</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Descuento</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={product.discount}
                    onChange={(e) => handleProductChange(index, 'discount', e.target.value)}
                  />
                </div>
                
                <div className="col-span-1">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeProductRow(index)}
                    disabled={products.length <= 1}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={addProductRow}
              className="mt-2"
            >
              + Agregar Producto
            </Button>
          </div>
          
          {/* Totales */}
          <div className="mt-6 border-t pt-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Subtotal:</p>
                <p className="font-medium">${subtotal.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Impuesto ({form.tax}%):</p>
                <p className="font-medium">${taxAmount.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Total:</p>
                <p className="text-lg font-bold">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          {/* Botón de guardar */}
          <div className="flex justify-end mt-6">
            <Button onClick={handleSubmit}>Guardar Cotización</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewQuoteModal;