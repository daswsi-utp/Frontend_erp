'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

const EditQuoteModal = ({ open, onClose, quote, onSave }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    salesRep: '',
    serviceType: '',
    amount: '',
    status: '',
    expiration: ''
  });

  useEffect(() => {
    if (quote) {
      setFormData({
        clientName: quote.client.name || '',
        salesRep: quote.salesRep || '',
        serviceType: quote.serviceType || '',
        amount: quote.amount || '',
        status: quote.status || '',
        expiration: quote.expiration || ''
      });
    }
  }, [quote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const updatedQuote = {
      ...quote,
      client: { ...quote.client, name: formData.clientName },
      salesRep: formData.salesRep,
      serviceType: formData.serviceType,
      amount: parseFloat(formData.amount),
      status: formData.status,
      expiration: formData.expiration
    };
    onSave(updatedQuote);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Cotización</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label>Cliente</Label>
            <Input name="clientName" value={formData.clientName} onChange={handleChange} />
          </div>
          <div>
            <Label>Vendedor</Label>
            <Input name="salesRep" value={formData.salesRep} onChange={handleChange} />
          </div>
          <div>
            <Label>Tipo de Servicio</Label>
            <Input name="serviceType" value={formData.serviceType} onChange={handleChange} />
          </div>
          <div>
            <Label>Monto</Label>
            <Input name="amount" type="number" value={formData.amount} onChange={handleChange} />
          </div>
          <div>
            <Label>Estado</Label>
            <Input name="status" value={formData.status} onChange={handleChange} />
          </div>
          <div>
            <Label>Fecha de Vencimiento</Label>
            <Input name="expiration" type="date" value={formData.expiration} onChange={handleChange} />
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
