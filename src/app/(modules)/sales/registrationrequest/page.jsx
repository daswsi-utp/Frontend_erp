// pages/ventas/registrationrequest.jsx

"use client";

import { useState } from "react";
import ClienteForm from "@/modules/sales/forms/ClienteForm";
import ProductosForm from "@/modules/sales/forms/ProductosForm";
import PagoEstadoForm from "@/modules/sales/forms/PagoEstadoForm";
import { Button } from "@/components/ui/button";

const RegistrationRequest = () => {
  const [cliente, setCliente] = useState({ nombre: "", contacto: "", direccion: "" });
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [orden, setOrden] = useState([]);
  const [estado, setEstado] = useState("Pendiente");
  const [metodoPago, setMetodoPago] = useState("efectivo");

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Registro de Órdenes de Venta</h1>
      <ClienteForm cliente={cliente} setCliente={setCliente} />
      <ProductosForm
        productoSeleccionado={productoSeleccionado}
        setProductoSeleccionado={setProductoSeleccionado}
        cantidad={cantidad}
        setCantidad={setCantidad}
        orden={orden}
        setOrden={setOrden}
      />
      <PagoEstadoForm
        metodoPago={metodoPago}
        setMetodoPago={setMetodoPago}
        estado={estado}
        setEstado={setEstado}
      />
      <Button className="w-full">Registrar Orden</Button>
    </div>
  );
};

export default RegistrationRequest;
