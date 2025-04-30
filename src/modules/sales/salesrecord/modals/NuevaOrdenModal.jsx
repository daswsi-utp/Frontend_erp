'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const NuevaOrdenModal = () => {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    cliente: '',
    producto: '',
    cantidad: '',
    prioridad: 'media',
    detalles: '',
    responsable: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Orden creada:', { ...formData, fecha: date });
    // Aquí iría la lógica para enviar los datos
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Orden
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Orden de Producción</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                placeholder="Nombre del cliente"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="producto">Producto</Label>
              <Input
                id="producto"
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                placeholder="Descripción del producto"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad</Label>
              <Input
                id="cantidad"
                name="cantidad"
                type="number"
                value={formData.cantidad}
                onChange={handleChange}
                placeholder="0"
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridad">Prioridad</Label>
              <Select 
                name="prioridad"
                value={formData.prioridad}
                onValueChange={(value) => setFormData({...formData, prioridad: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">Baja</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fecha Requerida</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Seleccione fecha</span>}
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsable">Responsable</Label>
            <Input
              id="responsable"
              name="responsable"
              value={formData.responsable}
              onChange={handleChange}
              placeholder="Nombre del responsable"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="detalles">Detalles Adicionales</Label>
            <Textarea
              id="detalles"
              name="detalles"
              value={formData.detalles}
              onChange={handleChange}
              placeholder="Especificaciones técnicas, notas importantes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogTrigger>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Crear Orden
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NuevaOrdenModal;