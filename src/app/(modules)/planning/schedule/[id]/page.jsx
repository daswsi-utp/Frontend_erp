"use client";

import CalendarSchedule from "@/components/calendar-schedule-planning";
import ManageParticipants from "@/components/manage-participants-planningDialog";
import ManageTasks from "@/components/manage-task-planningDialog";
import ScrollAreaTasks from "@/components/scroll-area-tasks";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import useCrud from "@/hooks/useCrud";
import { useParams } from "next/navigation";

const Schedule = () => {
  const params = useParams();
  const id = params?.id;

  const { getModel: getPlan } = useCrud("/planning/plan");
  const { getModel: getParticipants } = useCrud(`/planning/participants`);
  const { getModel: getTasks } = useCrud(`/planning/tasks`);

  const [planning, setPlanning] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const planData = await getPlan(`/planning/plan/${id}`);
      const participantsData = await getParticipants(`/planning/participant`);
      const tasksData = await getTasks(`/planning/task`);
      setPlanning(planData);
      setParticipants(participantsData);
      setTasks(tasksData);
    } catch (err) {
      console.error("Error al cargar los datos del planning", err);
    }
  };

  useEffect(() => {
    if (id) fetchData();
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

      <section className="w-full lg:w-[75%] flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-bold">Participantes</h1>
          <div className="w-full flex flex-wrap flex-row gap-4 justify-start">
            {participants.length > 0 ? (
              participants.map((p) => (
                <div
                  key={p.participant_id}
                  className="p-4 rounded-xl shadow-md text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 transition
             flex-1 sm:basis-[45%] md:basis-[30%] lg:basis-[23%] max-w-[250px]"
                >
                  <p className="text-lg font-bold text-center">
                    {p.participant_name} {p.participant_last_name}
                  </p>
                  <p className="text-center">{p.participant_email}</p>
                  <p className="text-center">{p.participant_phone}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No hay participantes</p>
            )}
          </div>

          <h1 className="text-xl font-bold">Tareas</h1>
          <div className="w-full flex flex-wrap flex-row gap-4 justify-start">
            {tasks.length > 0 ? (
              tasks.map((t) => (
                <div
                  key={t.task_id}
                  className="p-4 rounded-xl shadow-md text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:scale-105 transition
             flex-1 sm:basis-[45%] md:basis-[30%] lg:basis-[23%] max-w-[250px]"  
                >
                  <p className="text-lg font-bold text-center">{t.task_name}</p>
                  <p className="text-center">{t.task_description}</p>
                  <p className="text-center text-sm">
                    {new Date(t.task_start_date).toLocaleString()} - {new Date(t.task_end_date).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No hay tareas</p>
            )}
          </div>
          <h1 className="text-xl font-bold">Calendario</h1>
          <div className="w-full mt-6">
            <img
              src="https://github.com/PinwinoVolador/basicSurvival/blob/main/pinguino.png?raw=true"
              alt="Descripción de la imagen"
              className="w-[70%] max-w-4xl h-auto rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
