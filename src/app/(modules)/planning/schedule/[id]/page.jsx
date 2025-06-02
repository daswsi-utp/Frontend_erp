"use client"

import CalendarSchedule from "@/components/calendar-schedule-planning";
import ManageParticipants from "@/components/manage-participants-planningDialog";
import ManageTasks from "@/components/manage-task-planningDialog";
import ScrollAreaTasks from "@/components/scroll-area-tasks";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import useCrud from "@/hooks/useCrud";
import { useParams } from "next/navigation"

const Schedule = () => {
  const params = useParams()
  const id = params?.id
  const { getModel } = useCrud("/planning/plan");

  const [planning, setPlanning] = useState(null);
 
  const fetchPlanning = async () => {
    try {
      const data = await getModel(`/planning/plan/${id}`);
      setPlanning(data);
    } catch (err) {
      console.error("Error al cargar el planning", err);
    }
  };

  useEffect(() => {
    fetchPlanning();
  }, [id]);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
        <section className="w-full lg:w-[25%] flex flex-col gap-2">
            <h1 className="text-xl font-bold">{planning?.plan_name || "Cargando..."}</h1>
            <Separator />
            <ManageTasks />
            <ManageParticipants />
            <Separator />
            <ScrollAreaTasks />
        </section>
        <section className="w-full lg:w-[75%]">
            <CalendarSchedule />
        </section>
    </div>
  );
};

export default Schedule;
