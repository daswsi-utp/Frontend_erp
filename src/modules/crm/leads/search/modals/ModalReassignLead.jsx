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
import useCrud1 from '@/hooks/useCrud1';

const ModalReassignLead = ({ open, setOpen, lead, setLead }) => {
  const { getModel: getProducts } = useCrud1();
  const { getModel: getComercials } = useCrud1();
  const { updateModel: reassignLead } = useCrud1();

  const [products, setProducts] = useState([]);
  const [comercials, setComercials] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedComercial, setSelectedComercial] = useState(null);

  const loadData = async () => {
    try {
      const mockProducts = [
        { id: 1, name: "Curso de React" },
        { id: 2, name: "Curso de Next.js" },
        { id: 3, name: "Curso de Node.js" },
      ];
      const mockComercials = [
        { id: 1, first_name: "Ana", last_name: "López" },
        { id: 2, first_name: "Carlos", last_name: "Méndez" },
      ];

      setProducts(mockProducts);
      setComercials(mockComercials);
    } catch (error) {
      console.error("Error loading data:", error);
      setProducts([]);
      setComercials([]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setLead(null);
    setSelectedProduct(null);
    setSelectedComercial(null);
  };

  const handleSubmitReassignLead = async () => {
    try {
      if (!selectedComercial || !selectedProduct) {
        alert("Por favor selecciona un comercial y un producto");
        return;
      }
      alert(
        `Simulación de reasignación: Lead con ID ${lead.id} reasignado a ${selectedComercial} para el producto ${selectedProduct}`
      );
      handleClose();
    } catch (error) {
      console.error("Error reassigning lead:", error);
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
      size="xl"
      title={`Reasignar el Cliente: ${lead?.full_name}`}
      callBack={handleSubmitReassignLead}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="comercial" className="text-right">
            Comercial
          </Label>
          <Select onValueChange={setSelectedComercial} value={selectedComercial}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecciona Comercial" />
            </SelectTrigger>
            <SelectContent>
              {comercials.map((comercial) => (
                <SelectItem key={comercial.id} value={comercial.id}>
                  {`${comercial.first_name} ${comercial.last_name}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product" className="text-right">
            Producto
          </Label>
          <Select onValueChange={setSelectedProduct} value={selectedProduct}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecciona Curso" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="secondary"
            onClick={handleSubmitReassignLead}
            size="sm"
          >
            Reasignar Lead
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalReassignLead;
