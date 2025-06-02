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
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const NuevaOrdenModal = () => {
  const [quotes, setQuotes] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    quoteId: '',
    deliveryAddress: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, quotesRes] = await Promise.all([
          fetch('http://localhost:8091/api/v1/sales/transactions'),
          fetch('http://localhost:8091/api/v1/sales/quotes/approved')
        ]);

        if (salesRes.ok) setSales(await salesRes.json());
        if (quotesRes.ok) setQuotes(await quotesRes.json());
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
    setLoading(true);
    
    try {
      const response = await fetch(
        `http://localhost:8091/api/v1/sales/transactions/from-quote/${formData.quoteId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: formData.deliveryAddress
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.includes("ya fue convertida en venta")) {
          throw new Error("Esta cotización ya fue utilizada. Seleccione otra.");
        }
        throw new Error(errorText || 'Error al crear la venta');
      }

      const createdSale = await response.json();
      
      // Actualizar lista de ventas
      const salesRes = await fetch('http://localhost:8091/api/v1/sales/transactions');
      if (salesRes.ok) setSales(await salesRes.json());

      toast({
        title: "✅ Venta creada",
        description: `Venta #${createdSale.id} registrada.`,
      });

      setFormData({
        quoteId: '',
        deliveryAddress: ''
      });

    } catch (error) {
      toast({
        title: "❌ Error",
        description: error.message.includes("500") 
          ? "Error interno del servidor" 
          : error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
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