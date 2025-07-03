"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useCrud from "@/hooks/useCrud";
import FacturarOrdenModal from "../modals/FacturarOrdenModal";

const Tableorders = () => {
  const [search, setSearch] = useState("");
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { getModel } = useCrud();

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await getModel('/sales/transactions');
      setSales(response);
      console.log("Ventas cargadas:", response);
    } catch (error) {
      console.error("Error fetching sales:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las ventas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const translateStatus = (status) => {
    const statusMap = {
      'PACKAGED': 'Empacado',
      'SHIPPED': 'Enviado',
      'DELIVERED': 'Entregado',
      'IN_TRANSIT': 'En tránsito'
    };
    return statusMap[status] || status;
  };

  const handleOpenInvoiceModal = (sale) => {
  setSelectedOrder({
    id: sale.id,
    cliente: sale.quote?.clientName || 'Cliente no especificado',
    quoteId: sale.quote?.id // <<--- Añade esto
  });
  setIsModalOpen(true);
};

  const filteredSales = sales.filter((sale) =>
    (sale.quote?.clientName?.toLowerCase().includes(search.toLowerCase()) ||
    sale.id?.toString().toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return <div className="flex justify-center p-8">Cargando ventas...</div>;
  }

  return (
    <div className="space-y-6">
      <Input
        placeholder="Buscar por cliente o ID de venta..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Venta</TableHead>
            <TableHead>ID Cotización</TableHead>
            <TableHead>Fecha Venta</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSales.length > 0 ? (
            filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">#{sale.id}</TableCell>
                <TableCell>
                  {sale.quote?.id ? `COT-${sale.quote.id}` : 'N/A'}
                </TableCell>
                <TableCell>
                  {sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sale.deliveryStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    sale.deliveryStatus === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {translateStatus(sale.deliveryStatus)}
                  </span>
                </TableCell>
                <TableCell className="truncate max-w-[200px]">
                  {sale.deliveryAddress || 'N/A'}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm">Detalles</Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => handleOpenInvoiceModal(sale)}
                  >
                    Factura
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No se encontraron ventas
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <FacturarOrdenModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        orden={selectedOrder}
      />
    </div>
  );
};

export default Tableorders;