'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NewQuoteModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    clientName: "",
    salesRep: "",
    serviceType: "",
    amount: "",
    expiration: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newQuote = {
      id: Date.now(),
      client: { name: form.clientName },
      salesRep: form.salesRep,
      serviceType: form.serviceType,
      amount: parseFloat(form.amount),
      status: "pendiente",
      expiration: form.expiration,
      date: form.date,
      file: null
    };
    onSave(newQuote);
    setForm({
      clientName: "",
      salesRep: "",
      serviceType: "",
      amount: "",
      expiration: "",
      date: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Cotización</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="clientName" placeholder="Cliente" value={form.clientName} onChange={handleChange} />
          <Input name="salesRep" placeholder="Representante de ventas" value={form.salesRep} onChange={handleChange} />
          <Input name="serviceType" placeholder="Tipo de servicio" value={form.serviceType} onChange={handleChange} />
          <Input name="amount" placeholder="Monto" type="number" value={form.amount} onChange={handleChange} />
          <Input name="expiration" type="date" value={form.expiration} onChange={handleChange} />
          <Input name="date" type="date" value={form.date} onChange={handleChange} />
          <Button onClick={handleSubmit}>Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewQuoteModal;
