'use client';

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
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import useCrud from "@/hooks/useCrud";
import useEntityMutation from "@/hooks/useEntityMutation";

const NuevaOrdenModal = () => {
  const [quotes, setQuotes] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false); 

  const saleMutation = useEntityMutation('sale')
  
  // Usamos useCrud para las operaciones
  const { getModel, insertModel } = useCrud();

  const [formData, setFormData] = useState({
    quoteId: '',
    deliveryAddress: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Usamos getModel para obtener las cotizaciones aprobadas
        const [salesData, quotesData] = await Promise.all([
          getModel('/sales/transactions'),
          getModel('/sales/quotes/approved')
        ]);
        
        setSales(salesData);
        setQuotes(quotesData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error cargando datos",
          variant: "destructive",
        });
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validación básica
  if (!formData.quoteId || !formData.deliveryAddress) {
    toast({
      title: "❌ Error",
      description: "Por favor complete todos los campos",
      variant: "destructive",
    });
    return;
  }

  // Verificar si la cotización ya fue usada
  const isUsed = sales.some(sale => sale.quote?.id === parseInt(formData.quoteId));
  if (isUsed) {
    toast({
      title: "❌ Error",
      description: "Esta cotización ya fue utilizada. Seleccione otra.",
      variant: "destructive",
    });
    return;
  }

saleMutation.mutate(
  {
    action: 'create',
    entity: formData.deliveryAddress, // Texto plano: "Avenida Hunter"
    apiPath: `/sales/transactions/from-quote/${formData.quoteId}`,
    headers: {
      'Content-Type': 'text/plain',
    },
  },
  {
    onSuccess: async () => {
      setFormData({ quoteId: '', deliveryAddress: '' });
      const updatedSales = await getModel('/sales/transactions');
      setSales(updatedSales);
      setIsOpen(false);
    },
  }
);

};


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Venta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Venta</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Cotización Aprobada</Label>
            <Select 
              value={formData.quoteId}
              onValueChange={(value) => setFormData({...formData, quoteId: value})}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una cotización aprobada" />
              </SelectTrigger>
              <SelectContent>
                {quotes.map((quote) => {
                  const isUsed = sales.some(sale => sale.quote?.id === quote.id);
                  return (
                    <SelectItem 
                      key={quote.id} 
                      value={quote.id.toString()}
                      disabled={isUsed}
                      className={isUsed ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      COT-{quote.id} - {quote.productDescription}
                      {isUsed && <span className="text-red-500 ml-2">(Ya utilizada)</span>}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Dirección de Entrega</Label>
            <Input
              id="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
              placeholder="Dirección completa de entrega"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <DialogTrigger asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogTrigger>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear Venta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NuevaOrdenModal;