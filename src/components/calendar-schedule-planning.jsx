import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from './ui/dialog'
import { Button } from './ui/button'

function CalendarApp({ tasks, participants }) {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const transformed = tasks.map(task => {
    const assigned = participants.find(p => p.id === task.participant_id)

    return {
      id: String(task.task_id),
      title: task.task_name,
      start: task.task_start_date,
      end: task.task_end_date,
      extendedProps: {
        description: task.task_description,
        participant: assigned
          ? `${assigned.firstName ?? ''} ${assigned.lastName ?? ''}`.trim()
          : 'Sin asignar'
      }
    }
  })

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={transformed}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        eventClick={(info) => {
          setSelectedEvent({
            title: info.event.title,
            description: info.event.extendedProps.description,
            participant: info.event.extendedProps.participant
          })
        }}
      />

      {/* Modal de evento */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalle de la Tarea</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p><strong>Tarea:</strong> {selectedEvent?.title}</p>
            <p><strong>Descripción:</strong> {selectedEvent?.description}</p>
            <p><strong>Asignado a:</strong> {selectedEvent?.participant}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedEvent(null)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CalendarApp
