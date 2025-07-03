'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';

const paymentMethods = [
  { id: "CASH", name: "Efectivo" },
  { id: "TRANSFER", name: "Transferencia" },
  { id: "CREDIT_CARD", name: "Tarjeta de Crédito" }
];

const quoteStates = [
  { id: "PENDING", name: "Pendiente" },
  { id: "APPROVED", name: "Aprobada" },
  { id: "REJECTED", name: "Rechazada" }
];

const EditQuoteModal = ({ open, onClose, quote, onSave }) => {
  const [formData, setFormData] = useState({
    id: 0,
    expirationDate: '',
    state: 'PENDING',
    typePayment: '',
    observation: ''
  });

  useEffect(() => {
    if (quote) {
      setFormData({
        id: quote.id || 0,
        expirationDate: quote.expirationDate ? quote.expirationDate.split('T')[0] : '',
        state: quote.state || 'PENDING',
        typePayment: quote.typePayment || paymentMethods[0].id,
        observation: quote.observation || ''
      });
    }
  }, [quote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const updatedQuote = {
      id: formData.id,
      expirationDate: formData.expirationDate ? `${formData.expirationDate}T00:00:00` : null,
      state: formData.state,
      typePayment: formData.typePayment,
      observation: formData.observation
    };
    
    onSave(updatedQuote);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Cotización #{formData.id}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Solo campos editables según tu API */}
          
          <div>
            <Label>Fecha de Vencimiento *</Label>
            <Input 
              name="expirationDate" 
              type="date" 
              value={formData.expirationDate} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label>Estado *</Label>
            <Select 
              value={formData.state} 
              onValueChange={(value) => handleSelectChange('state', value)}
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
          
          <div>
            <Label>Método de Pago *</Label>
            <Select 
              value={formData.typePayment} 
              onValueChange={(value) => handleSelectChange('typePayment', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.typePayment 
                  ? paymentMethods.find(m => m.id === formData.typePayment)?.name 
                  : "Seleccione método"} />
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
            <Label>Observaciones</Label>
            <Input 
              name="observation" 
              value={formData.observation} 
              onChange={handleChange}
              placeholder="Notas adicionales sobre la cotización"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuoteModal;