"use client";

import ManageParticipants from "@/components/manage-participants-planningDialog";
import ManageTasks from "@/components/manage-task-planningDialog";
import ScrollAreaTasks from "@/components/scroll-area-tasks";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import useCrud from "@/hooks/useCrud";
import { useParams } from "next/navigation";
import CalendarApp from "@/components/calendar-schedule-planning";
import useFetchTasks from "@/modules/planning/hooks/useFetchTasks";
import useFetchPlanById from "@/modules/planning/hooks/useFetchPlanById";
import useFetchEmployees from "@/modules/rrhh/hooks/useFetchEmployee";

const Schedule = () => {
  const params = useParams();
  const id = params?.id;
  const { data: taskData, isLoading, refetch:refetchTasks } = useFetchTasks(id);
  const { data: planData, isLoading: isPlanLoading } = useFetchPlanById(id);
  const { data: employeeData, isLoading: isEmployeeLoading } = useFetchEmployees();
  const planning = planData

  const handleTaskUpdate = () => {
    refetchTasks();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <section className="w-full lg:w-[25%] flex flex-col gap-2">
        <h1 className="text-xl font-bold">{planning?.plan_name || "Cargando..."}</h1>
        <Separator />
        <ManageTasks planId={id} onTaskUpdate={handleTaskUpdate} tasks={taskData?.rows || []} participants={employeeData?.rows || []} />
        <Separator />
        <ScrollAreaTasks tasks={taskData?.rows || []} onTaskUpdate={handleTaskUpdate} />
      </section>

      <section className="w-full lg:w-[75%] flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-bold">Calendario</h1>
          <div>
            <CalendarApp tasks={taskData?.rows || []} participants={employeeData?.rows || []} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
