'use client';

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

import useFetchProviders from "@/modules/logistic/hooks/useFetchProviders";
import useEntityMutation from "@/hooks/useEntityMutation";

export default function ProveedoresPanel() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({
    id_proveedor: null,
    nombre: "",
    contacto: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const { data: providersData, refetch } = useFetchProviders();
  const mutation = useEntityMutation('providers');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      action: editando ? 'update' : 'create',
      entity: form,
      id: form.id_proveedor,
      apiPath: editando
        ? `/logistic/providers/${form.id_proveedor}`
        : '/logistic/providers',
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        refetch();
        handleDialogClose();
      }
    });
  };

  const handleEdit = (proveedor) => {
    setForm(proveedor);
    setEditando(true);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    mutation.mutate({
      action: 'delete',
      id,
      entity: {},
      apiPath: `/logistic/providers/${id}`,
    }, {
      onSuccess: () => refetch()
    });
  };

  const handleDialogClose = () => {
    setForm({
      id_proveedor: null,
      nombre: "",
      contacto: "",
      telefono: "",
      email: "",
      direccion: "",
    });
    setEditando(false);
    setDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>🏢 Gestión de Proveedores</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { handleDialogClose(); setDialogOpen(true); }}>
              + Nuevo proveedor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-xl font-semibold">
              {editando ? "Editar proveedor" : "Nuevo proveedor"}
            </DialogTitle>
            <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
              <div>
                <Label>Nombre</Label>
                <Input name="nombre" value={form.nombre} onChange={handleChange} required />
              </div>
              <div>
                <Label>Contacto</Label>
                <Input name="contacto" value={form.contacto} onChange={handleChange} />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input name="telefono" value={form.telefono} onChange={handleChange} />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" name="email" value={form.email} onChange={handleChange} />
              </div>
              <div>
                <Label>Dirección</Label>
                <Textarea name="direccion" value={form.direccion} onChange={handleChange} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleDialogClose}>
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
            {providersData?.rows.map((p) => (
              <TableRow key={p.id_proveedor}>
                <TableCell>{p.nombre}</TableCell>
                <TableCell>{p.contacto}</TableCell>
                <TableCell>{p.telefono}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.direccion}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" onClick={() => handleEdit(p)}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id_proveedor)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}