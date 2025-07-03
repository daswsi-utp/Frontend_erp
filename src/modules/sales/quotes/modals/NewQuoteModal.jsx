'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import useCrud from "@/hooks/useCrud";

// Mantenemos estas constantes ya que no dependen de la API
const sampleClients = [
  { id: 1, name: "Cliente X" },
  { id: 2, name: "Cliente Y" },
  { id: 3, name: "Cliente Z" }
];

const paymentMethods = [
  { id: "CASH", name: "Efectivo" },
  { id: "CREDIT_CARD", name: "Tarjeta Crédito" },
  { id: "TRANSFER", name: "Transferencia" }
];

const quoteStates = [
  { id: "PENDING", name: "Pendiente" },
  { id: "APPROVED", name: "Aprobada" },
  { id: "REJECTED", name: "Rechazada" }
];

const NewQuoteModal = ({ open, onClose, onSave }) => {
  const { getModel } = useCrud();

  const [form, setForm] = useState({
    clientId: "",
    employeeId: "",
    issueDate: new Date().toISOString(),
    expirationDate: "",
    state: "PENDING",
    typePayment: "",
    observation: ""
  });

  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]); // Estado para almacenar productos de la API
  const [quoteProducts, setQuoteProducts] = useState([
    { productId: "", productName: "",amount: 1, prize: 0, discount: 0, tax: 18 }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...quoteProducts];
    newProducts[index][field] = field === 'amount' || field === 'prize' || field === 'discount' || field === 'tax' 
      ? parseFloat(value) || 0 
      : value;
    
    // Actualizar precio si se selecciona un producto nuevo
    if (field === 'productId') {
      const selectedProduct = products.find(p => p.id && p.id.toString() === value);
      if (selectedProduct) {
        newProducts[index].prize = selectedProduct.precio || 0;
        newProducts[index].productName = selectedProduct.descripcion || '';
      }
    }
    
    setQuoteProducts(newProducts);
  };

  const addProductRow = () => {
    setQuoteProducts([...quoteProducts, { productId: "", amount: 1, prize: 0, discount: 0, tax: 18 }]);
  };

  const removeProductRow = (index) => {
    if (quoteProducts.length > 1) {
      const newProducts = [...quoteProducts];
      newProducts.splice(index, 1);
      setQuoteProducts(newProducts);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const expirationDate = new Date(form.expirationDate);
    if (isNaN(expirationDate.getTime())) {
      alert('La fecha de vencimiento no es válida');
      return;
    }
    
    setIsSubmitting(true);
      
    try {
      const quoteData = {
        issueDate: form.issueDate,
        expirationDate: new Date(form.expirationDate).toISOString(),
        state: form.state,
        clientId: Number(form.clientId),
        employeeId: Number(form.employeeId),
        typePayment: form.typePayment,
        observation: form.observation,
        details: quoteProducts.map(p => ({
          productId: Number(p.productId),
           productName: p.productName,
          amount: p.amount,
          prize: p.prize,
          discount: p.discount,
          tax: p.tax
        }))
      };
      
      onSave(quoteData);
      // Reset form
      setForm({
        clientId: "",
        employeeId: "",
        issueDate: new Date().toISOString(),
        expirationDate: "",
        state: "PENDING",
        typePayment: "",
        observation: ""
      });
      setQuoteProducts([{ productId: "", amount: 1, prize: 0, discount: 0, tax: 18 }]);
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Cargar vendedores
        const vendedores = await getModel('/rrhh/employee/position/VENDEDOR');
        setEmployees(vendedores || []);
        
        // Cargar productos
        const productos = await getModel('/logistic/products');
        setProducts(productos || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setEmployees([]);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, getModel]);

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
              <label className="block text-sm font-medium mb-1">Vendedor</label>
              <Select 
                value={form.employeeId} 
                onValueChange={(value) => setForm({...form, employeeId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id.toString()}>
                       {`${emp.firstName} ${emp.lastName}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fecha Emisión</label>
              <Input 
                type="datetime-local" 
                name="issueDate" 
                value={form.issueDate.substring(0, 16)} 
                onChange={(e) => setForm({...form, issueDate: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fecha Vencimiento</label>
              <Input 
                type="datetime-local" 
                name="expirationDate" 
                value={form.expirationDate.substring(0, 16)} 
                onChange={(e) => setForm({...form, expirationDate: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Método de Pago</label>
              <Select 
                value={form.typePayment} 
                onValueChange={(value) => setForm({...form, typePayment: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione método" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map(method => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <Select 
                value={form.state} 
                onValueChange={(value) => setForm({...form, state: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione estado" />
                </SelectTrigger>
                <SelectContent>
                  {quoteStates.map(state => (
                    <SelectItem key={state.id} value={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Observación</label>
              <Input
                name="observation"
                value={form.observation}
                onChange={handleFormChange}
                placeholder="Notas adicionales"
              />
            </div>
          </div>
          
          {/* Sección de productos */}
          <div className="mt-6">
            <h3 className="font-medium mb-2">Detalles de Productos</h3>
            
            {quoteProducts.map((product, index) => (
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
                      {products.map(product => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.descripcion} - ${product.precio}
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
                    value={product.amount}
                    onChange={(e) => handleProductChange(index, 'amount', e.target.value)}
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Precio</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={product.prize}
                    onChange={(e) => handleProductChange(index, 'prize', e.target.value)}
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
          
          {/* Botón de guardar */}
          <div className="flex justify-end mt-6">
            <Button onClick={handleSubmit} disabled={isSubmitting}>
               {isSubmitting ? "Guardando..." : "Guardar Cotización"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewQuoteModal;