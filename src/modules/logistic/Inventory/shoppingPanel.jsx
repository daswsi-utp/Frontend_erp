"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import useCrud from "@/hooks/useCrud";

const mockProductos = [
    { id: 1, nombre: "Mouse Logitech M280" },
    { id: 2, nombre: "Monitor Samsung 24”" },
];

const mockProveedores = [
    { id: 1, nombre: "Logitech Perú" },
    { id: 2, nombre: "Samsung SAC" },
];

export default function ShoppingPanel() {
    const {
        addItem,
        setCurrentItem,
        cancelEdit,
    } = useCrud("/logistic/supplyings");

    const [compra, setCompra] = useState({
        producto_id: "",
        proveedor_id: "",
        cantidad: "",
        precio_unitario: "",
        fecha_compra: "",
        observacion: "",
    });

    const [archivo, setArchivo] = useState(null);

    const handleChange = (e) => {
        setCompra({ ...compra, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("producto_id", compra.producto_id);
        data.append("proveedor_id", compra.proveedor_id);
        data.append("cantidad", compra.cantidad);
        data.append("precio_unitario", compra.precio_unitario);
        data.append("fecha_compra", compra.fecha_compra);
        data.append("observacion", compra.observacion);
        if (archivo) {
            data.append("documento_compra", archivo);
        }

        try {
            await addItem(data, true); // `true` indica que se está enviando FormData
            setCompra({
                producto_id: "",
                proveedor_id: "",
                cantidad: "",
                precio_unitario: "",
                fecha_compra: "",
                observacion: "",
            });
            setArchivo(null);
            cancelEdit();
        } catch (error) {
            console.error("Error al registrar la compra:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>📥 Registro de Compras</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                        <Label>Producto</Label>
                        <Select
                            value={compra.producto_id}
                            onValueChange={(val) => setCompra({ ...compra, producto_id: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un producto" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockProductos.map((p) => (
                                    <SelectItem key={p.id} value={p.id.toString()}>
                                        {p.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="link" type="button" className="text-blue-500 px-0 mt-1">
                            + Crear nuevo producto
                        </Button>
                    </div>

                    <div>
                        <Label>Proveedor</Label>
                        <Select
                            value={compra.proveedor_id}
                            onValueChange={(val) => setCompra({ ...compra, proveedor_id: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un proveedor" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockProveedores.map((p) => (
                                    <SelectItem key={p.id} value={p.id.toString()}>
                                        {p.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="link" type="button" className="text-blue-500 px-0 mt-1">
                            + Crear nuevo proveedor
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Cantidad</Label>
                            <Input
                                type="number"
                                name="cantidad"
                                value={compra.cantidad}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Precio Unitario (S/)</Label>
                            <Input
                                type="number"
                                name="precio_unitario"
                                step="0.01"
                                value={compra.precio_unitario}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Fecha de Compra</Label>
                            <Input
                                type="date"
                                name="fecha_compra"
                                value={compra.fecha_compra}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Comprobante (Depósito)</Label>
                            <Input
                                type="file"
                                name="documento_compra"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Observación</Label>
                        <Textarea
                            name="observacion"
                            value={compra.observacion}
                            onChange={handleChange}
                            placeholder="Compra por bajo stock de producto..."
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Registrar Compra
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}