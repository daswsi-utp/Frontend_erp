'use client';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import MetricsPanel from "./metricsPanel";
import InventoryPanel from "../inventory/inventoryPanel";
import ProductFormPanel from "../inventory/productsFormPanel";
import ProductEditPanel from "../inventory/productEditPanel";

export default function DashboardTabs() {
    return (
        <Tabs defaultValue="metricas" className="w-full">
            <TabsList className="mb-4">
                <TabsTrigger value="metricas">📊 Métricas</TabsTrigger>
                <TabsTrigger value="productos">📦 Inventario</TabsTrigger>
                <TabsTrigger value="editarProductos">⚙️ Crear Productos</TabsTrigger>
                <TabsTrigger value="editarExistente">⚙️ Editar Productos</TabsTrigger>
            </TabsList>

            <TabsContent value="metricas">
                <MetricsPanel />
            </TabsContent>

            <TabsContent value="productos">
                <InventoryPanel />
            </TabsContent>

            <TabsContent value="editarProductos">
                <ProductFormPanel />
            </TabsContent>

            <TabsContent value="editarExistente">
                <ProductEditPanel />
            </TabsContent>
        </Tabs>
    );
}