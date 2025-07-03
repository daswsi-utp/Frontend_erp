'use client';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import MetricsPanel from "./metricsPanel";
import InventoryPanel from "../Inventory/inventoryPanel";
import ProductPanel from "../Inventory/productPanel";
import ShoppingPanel from "../Inventory/shoppingPanel";
import ProveedoresPanel from "../Inventory/providerPanel";

export default function DashboardTabs() {
    return (
        <Tabs defaultValue="metricas" className="w-full">
            <TabsList className="mb-4">
                <TabsTrigger value="metricas">📊 Métricas</TabsTrigger>
                <TabsTrigger value="productos">📦 Inventario</TabsTrigger>
                <TabsTrigger value="compras">🛒 Abastecimiento</TabsTrigger>
                <TabsTrigger value="gestionarProductos">⚙️ Productos</TabsTrigger>
                <TabsTrigger value="proveedores">🏢 Proveedores</TabsTrigger>
            </TabsList>

            <TabsContent value="metricas">
                <MetricsPanel />
            </TabsContent>

            <TabsContent value="productos">
                <InventoryPanel />
            </TabsContent>

            <TabsContent value="gestionarProductos">
                <ProductPanel />
            </TabsContent>

            <TabsContent value="compras">
                <ShoppingPanel />
            </TabsContent>

            <TabsContent value="proveedores">
                <ProveedoresPanel />
            </TabsContent>
        </Tabs>
    );
}