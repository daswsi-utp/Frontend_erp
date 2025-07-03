'use client';
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useCrud from "@/hooks/useCrud";
import jsPDF from "jspdf";

const FacturarOrdenModal = ({ open, onOpenChange, orden }) => {
  const { toast } = useToast();
  const { getModel } = useCrud();
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [downloading, setDownloading] = useState(false); 

  useEffect(() => {
    const fetchInvoiceData = async () => {
      if (open && orden?.id) {
        setLoading(true);
        try {
          const data = await getModel(`/sales/invoices/by-sale/${orden.id}`);
          setInvoiceData(data);
        } catch (error) {
          console.error("Error al cargar la factura:", error);
          toast({
            title: "Error al cargar factura",
            description: error?.message || "No se pudo cargar la información de la factura.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInvoiceData();
  }, [open, orden?.id, getModel, toast]);

const handleDownload = async () => {
  if (!invoiceData) {
    toast({
      title: "Error",
      description: "No hay datos de factura para descargar.",
      variant: "destructive",
    });
    return;
  }

  setDownloading(true); 
  try {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Factura OP-${invoiceData.id}`, 10, 10);
    doc.text(`Número de Factura: ${invoiceData.invoiceNumber}`, 10, 20);
    doc.text(`Fecha de Emisión: ${new Date(invoiceData.issueDate).toLocaleDateString()}`, 10, 30);
    doc.text(`Método de Pago: ${invoiceData.paymentMethod}`, 10, 40);
    doc.text(`Total: $${invoiceData.totalAmount.toFixed(2)}`, 10, 50);
    doc.text(`Subtotal: $${invoiceData.subtotal.toFixed(2)}`, 10, 60);
    doc.text(`Impuesto: $${invoiceData.tax.toFixed(2)}`, 10, 70);
    doc.text(`Descuento: ${invoiceData.discount ? `$${invoiceData.discount.toFixed(2)}` : 'N/A'}`, 10, 80);
    doc.text("Detalles:", 10, 90);

    let y = 100;
    invoiceData.details.forEach(detail => {
      doc.text(
        `${detail.productName || "Producto desconocido"} - Cantidad: ${detail.quantity}, Precio Unitario: $${detail.unitPrice.toFixed(2)}, Total: $${detail.totalLine.toFixed(2)}`,
        10,
        y
      );
      y += 10;
    });

    doc.save(`Factura_${invoiceData.invoiceNumber}.pdf`);

    await new Promise((resolve) => setTimeout(resolve, 0));

    toast({
      title: "Descargando factura...",
      description: `Factura #${invoiceData.invoiceNumber} descargada correctamente.`,
      variant: "success",
    });
  } catch (error) {
    console.error("Error al generar PDF:", error);
    toast({
      title: "Error al generar PDF",
      description: error?.message || "Ocurrió un error al generar la factura.",
      variant: "destructive",
    });
  } finally {
    setDownloading(false); 
  }
};


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Factura OP-{invoiceData?.id ?? "..."}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <p className="font-medium"><strong>Número de Factura:</strong> {invoiceData ? invoiceData.invoiceNumber : 'Cargando...'}</p>
            <p className="font-medium"><strong>Fecha de Emisión:</strong> {invoiceData ? new Date(invoiceData.issueDate).toLocaleDateString() : 'Cargando...'}</p>
            <p className="font-medium"><strong>Método de Pago:</strong> {invoiceData ? invoiceData.paymentMethod : 'Cargando...'}</p>
            <p className="font-medium"><strong>Total:</strong> ${invoiceData ? invoiceData.totalAmount.toFixed(2) : 'Cargando...'}</p>
            <p className="font-medium"><strong>Subtotal:</strong> ${invoiceData ? invoiceData.subtotal.toFixed(2) : 'Cargando...'}</p>
            <p className="font-medium"><strong>Impuesto:</strong> ${invoiceData ? invoiceData.tax.toFixed(2) : 'Cargando...'}</p>
            <p className="font-medium"><strong>Descuento:</strong> {invoiceData && invoiceData.discount ? `$${invoiceData.discount.toFixed(2)}` : 'N/A'}</p>
          </div>
          <h3 className="font-semibold text-lg mb-2">Detalles:</h3>
          <ul className="list-disc list-inside">
            {invoiceData ? invoiceData.details.map(detail => (
              <li key={detail.id} className="mb-1">
                {detail.productName || "Producto desconocido"} - Cantidad: {detail.quantity}, Precio Unitario: ${detail.unitPrice.toFixed(2)}, Total: ${detail.totalLine.toFixed(2)}
              </li>
            )) : 'Cargando...'}
          </ul>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button
  className="bg-blue-600 hover:bg-blue-700 text-white"
  onClick={handleDownload}
  disabled={!invoiceData || downloading}
>
  {downloading ? "Generando..." : "Descargar"}
</Button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FacturarOrdenModal;
