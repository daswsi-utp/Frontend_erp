import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/shared/button";
import { Label } from "@/components/ui/label";
import Modal from '@/components/shared/modal';
import useCrud from '@/hooks/useCrud';
import useEntityMutation from '@/hooks/useEntityMutation';

const ModalReassignLead = ({ open, setOpen, lead, setLead }) => {
  const { getModel: getProducts } = useCrud("/crm/products");
  const { getModel: getComercials } = useCrud("/crm/members");
  const mutation = useEntityMutation("clients");

  const [products, setProducts] = useState([]);
  const [comercials, setComercials] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedComercial, setSelectedComercial] = useState('');

  const loadData = async () => {
    try {
      const fetchedProducts = await getProducts();
      const fetchedComercials = await getComercials();
      setProducts(fetchedProducts);
      setComercials(fetchedComercials);

      if (lead) {
        setSelectedProduct(String(lead.productId || ''));
        setSelectedComercial(String(lead.memberId || ''));
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setProducts([]);
      setComercials([]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setLead(null);
    setSelectedProduct('');
    setSelectedComercial('');
  };

  const handleSubmitReassignLead = async () => {
    try {
      if (!selectedComercial || !selectedProduct) {
        alert("Por favor selecciona un asesor y un producto");
        return;
      }

      await mutation.mutateAsync({
        action: 'update',
        apiPath: `/crm/clients/${lead.id}/reassign`,
        entity: {
          memberId: Number(selectedComercial),
          productId: Number(selectedProduct),
        },
      });

      handleClose();
    } catch (error) {
      console.error("Error reassigning lead:", error);
      alert("Ocurrió un error al reasignar el cliente.");
    }
  };

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      size="sm"
      title={`Reasignar Cliente: ${lead?.fullName || `${lead?.firstName || ''} ${lead?.lastName || ''}`}`}
      callBack={handleSubmitReassignLead}
    >
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="comercial">Seleccione Asesor a asignar</Label>
          <Select onValueChange={setSelectedComercial} value={selectedComercial}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar asesor" />
            </SelectTrigger>
            <SelectContent>
              {comercials.map((comercial) => (
                <SelectItem key={comercial.id} value={String(comercial.id)}>
                  {comercial.fullName || `${comercial.firstName || ''} ${comercial.lastName || ''}`.trim()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="product">Seleccione Producto a asignar</Label>
          <Select onValueChange={setSelectedProduct} value={selectedProduct}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar producto" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={String(product.id)}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-200 dark:border-zinc-700">
          <Button
            variant="secondary"
            onClick={handleSubmitReassignLead}
            size="sm"
          >
            Reasignar Cliente
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalReassignLead;
