import Paymentmethod from "@/modules/sales/convert/paymentmethod";
import Quotesummary from "@/modules/sales/convert/quotesummary";
import Stockvalidation from "@/modules/sales/convert/Stockvalidation";
import { Button } from "@/components/ui/button";

const ConversionCotizacionPage = () => {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Conversión de Cotización a Orden</h1>
      <Paymentmethod />
      <Quotesummary />
      <Stockvalidation />
      <Button className="w-full">Confirmar Orden</Button>
    </div>
  );
};

export default ConversionCotizacionPage;
