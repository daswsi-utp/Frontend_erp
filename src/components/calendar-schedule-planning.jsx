import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react/dist/index'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
    viewMonthGrid,
    viewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import '@schedule-x/theme-shadcn/dist/index.css'
import { useEffect } from "react";
import React, { useState } from 'react';
import { createEventModalPlugin } from '@schedule-x/event-modal'

const CalendarSchedule = () => {

    const eventsService = useState(() => createEventsServicePlugin())[0]

    const calendar = useNextCalendarApp({
        theme: "shadcn",
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [
            {
                id: '1',
                title: 'wasd',
                start: '2025-04-23 02:30',
                end: '2025-04-23 05:00'
            },
            {
                id: '2',
                title: 'tukituki',
                start: '2025-04-21 06:00',
                end: '2025-04-21 08:00'
            },
            {
                id: '3',
                title: 'wwww',
                start: '2025-04-24 04:00',
                end: '2025-04-24 08:00'
            },
        ],
        
        plugins: [eventsService, createDragAndDropPlugin(30), createEventModalPlugin()]
    })

    return (
        <div className="max-w-4xl mx-auto h-[600px] overflow-y-auto border rounded">
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

export default CalendarSchedule