"use client"
import React, { useEffect, useState } from "react";
import ProductsTable from "@/modules/logistic/products/tables/productsTable";
import EditProduct from "@/modules/logistic/products/modals/EditProduct";
import NewProduct from "@/modules/logistic/products/modals/newProduct";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useEntityMutation from "@/hooks/useEntityMutation";
import useFetchProducts from "@/modules/logistic/hooks/useFetchProducts";


const Products = () => {
  const productMutation = useEntityMutation('product')
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const { data, isLoading } = useFetchProducts()

  const deleteProduct = async (product) =>{
    try {
      productMutation.mutate({
        action: 'delete',
        id: product.id,
        entity: {},
        apiPath: `/logistic/products/${product.id}`
      })
    } catch (error) {
      console.error("Error during delete employee", error)
    }
  }

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Productos de la Organización</h1>
        <NewProduct/>
      </div>
      <Card>
        <CardContent>
          <ProductsTable
            data={data?.rows || [] }
            isLoading={isLoading}
            setSelectedProduct={setSelectedProduct}
            setOpenEdit={setOpenEdit}
            deleteProduct={deleteProduct}
          />
        </CardContent>
      </Card>
      <EditProduct
        open={openEdit}
        onOpenChange={setOpenEdit}
        product={selectedProduct}
        onProductChange={setSelectedProduct}
      />
    </>
  );
};
  
export default Products;