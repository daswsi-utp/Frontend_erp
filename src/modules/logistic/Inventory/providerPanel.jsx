'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import useCrud from "@/hooks/useCrud";
import React, { useEffect, useState } from "react";

export default function ProveedoresPanel() {
  const {getModel} = useCrud("")
  const [providers, setProviders] = useState({});

  const fetchProviders = async () =>{
    try {
      const data = await getModel( "/logistic/providers");
      setProviders(data);
    } catch (error) {
      console.error("error cargando empleados");
    }
  }

  useEffect(() => {
    fetchProviders();
  }, []);
  const {
    items: proveedores = [],
    currentItem: form,
    editing: editando,
    addItem,
    updateItem,
    deleteItem,
    startEdit,
    cancelEdit,
    setCurrentItem,
  } = useCrud("/logistic/providers");

  const [dialogOpen, setDialogOpen] = useState(false);

  function initialForm() {
    return {
      id_proveedor: null,
      nombre: "",
      contacto: "",
      telefono: "",
      email: "",
      direccion: "",
    };
  }

  const handleChange = (e) => {
    setCurrentItem({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      updateItem(form);
    } else {
      addItem(form);
    }

    setCurrentItem(initialForm());
    cancelEdit();
    setDialogOpen(false);
  };

  const handleEdit = (proveedor) => {
    startEdit(proveedor);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>🏢 Gestión de Proveedores</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentItem(initialForm());
                cancelEdit();
                setDialogOpen(true); // se asegura que el diálogo se abra
              }}
            >
              + Nuevo proveedor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <h2 className="text-xl font-semibold">
                {editando ? "Editar proveedor" : "Nuevo proveedor"}
              </h2>
              <div>
                <Label>Nombre</Label>
                <Input name="nombre" value={form?.nombre || ""} onChange={handleChange} required />
              </div>
              <div>
                <Label>Contacto</Label>
                <Input name="contacto" value={form?.contacto || ""} onChange={handleChange} />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input name="telefono" value={form?.telefono || ""} onChange={handleChange} />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" name="email" value={form?.email || ""} onChange={handleChange} />
              </div>
              <div>
                <Label>Dirección</Label>
                <Textarea name="direccion" value={form?.direccion || ""} onChange={handleChange} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editando ? "Actualizar" : "Guardar"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers?.map((p) => (
              <TableRow key={p.id_proveedor}>
                <TableCell>{p.nombre}</TableCell>
                <TableCell>{p.contacto}</TableCell>
                <TableCell>{p.telefono}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.direccion}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" onClick={() => handleEdit(p)}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id_proveedor)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}