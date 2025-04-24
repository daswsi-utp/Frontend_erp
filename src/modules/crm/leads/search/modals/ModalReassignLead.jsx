import React, { useState, useEffect, useRef } from 'react'
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/shared/button"
import { Label } from "@/components/ui/label"
import Modal from '@/components/shared/modal'
import useCrud1 from '@/hooks/useCrud1'

const ModalReassignLead = ({ open, setOpen, lead, setLead }) => {
 const { getModelData: getproducts } = useCrud1()
 const { getModelData: getComercials } = useCrud1()
 const { updateModelWithConfirmation: reassignLead } = useCrud1("")

 const [products, setproducts] = useState([])
 const [comercials, setComercials] = useState([])
 const [selectedProduct, setSelectedProduct] = useState(null)
 const [selectedComercial, setSelectedComercial] = useState(null)

 const loadData = async () => {
  const { products } = await getproducts("/api/v1/comercial/products/active")
  const { comercials } = await getComercials("/api/v1/general/comercials")
  setproducts(products)
  setComercials(comercials)
 }

 const handleClose = () => {
  setOpen(false)
  setLead(null)
  setSelectedProduct(null)
  setSelectedComercial(null)
 }

 const handleSubmitReassignLead = async () => {
  await reassignLead(
   { user_id: selectedComercial, product_id: selectedProduct },
   `/api/v1/admin/leads/${lead.id}/reasign`,
   handleClose
  )
 }

 useEffect(() => {
  if (open) {
   loadData()
  }
 }, [open])

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
      Curso
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
   </div>
  </Modal>
 )
}

export default ModalReassignLead