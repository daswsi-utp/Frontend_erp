"use client"

import CalendarSchedule from "@/components/calendar-schedule-planning";
import ManageParticipants from "@/components/manage-participants-planningDialog";
import ManageTasks from "@/components/manage-task-planningDialog";
import ScrollAreaTasks from "@/components/scroll-area-tasks";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Schedule = ({ params }) => {
    const { id } = React.use(params)

    const planningData = {
        "1": {
            name: "Proyecto 1",
            description: "ERP con 6 módulos usando Next.js y Spring",
            dates: "01/06/2024 - 30/11/2024"
        },
        "2": {
            name: "Horario eventos royal candy",
            description: "Gestión de horarios para trabajadores",
            dates: "15/05/2024 - 20/12/2024"
        },
        "3": {
            name: "wadwadawdadwa",
            description: "GSoy el 3",
            dates: "15/05/2024 - 20/12/2024"
        },
        "4": {
            name: "wiwiwiwiwi",
            description: "yo soy el 4",
            dates: "15/05/2024 - 20/12/2040"
        }
    };

    const planning = planningData[id] || {
        name: "Planeación no encontrada",
        description: "La planeación solicitada no existe",
        dates: "N/A"
    };

    return (
        <div>
            <div className="flex gap-4 align-top">
                <section className="w-[25%] flex flex-col gap-2">
                    <h1 className="text-[20px]">{planning.name}</h1>
                    <Separator></Separator>
                    <ManageTasks></ManageTasks>
                    <ManageParticipants></ManageParticipants>
                    <Separator></Separator>
                    <ScrollAreaTasks></ScrollAreaTasks>
                </section>
                <section className="w-[75%]">
                    <CalendarSchedule></CalendarSchedule>
                </section>
            </div>
        </div>
    )
}

export default Schedule