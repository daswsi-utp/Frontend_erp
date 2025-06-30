"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useCrud from "@/hooks/useCrud";

const CreateParticipant = ({ onParticipantUpdate }) => {
  const [formData, setFormData] = useState({
    participant_name: "",
    participant_last_name: "",
    participant_email: "",
    participant_phone: "",
  });

  const { insertModel } = useCrud("/planning/participant");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertModel(formData, "/planning/participant/create");
      setFormData({
        participant_name: "",
        participant_last_name: "",
        participant_email: "",
        participant_phone: "",
      });
      if (onParticipantUpdate) onParticipantUpdate();
    } catch (error) {
      console.error("Error al registrar el participante:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear Participante +</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Participante</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              name="participant_name"
              type="text"
              value={formData.participant_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Apellido</label>
            <input
              name="participant_last_name"
              type="text"
              value={formData.participant_last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Correo</label>
            <input
              name="participant_email"
              type="email"
              value={formData.participant_email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              name="participant_phone"
              type="text"
              value={formData.participant_phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <Button type="submit" className="mt-2">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateParticipant;
