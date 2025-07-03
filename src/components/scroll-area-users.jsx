// ScrollAreaUsers.jsx
import React, { Fragment } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Checkbox } from "./ui/checkbox"
import { Separator } from "./ui/separator"

const ScrollAreaUsers = ({ selectedIds, setSelectedIds, participants = [] }) => {
  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const newSelected = new Set(prev)
      if (newSelected.has(id)) {
        newSelected.delete(id)
      } else {
        newSelected.add(id)
      }
      return newSelected
    })
  }

  return (
    <ScrollArea className="h-30  rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Empleados</h4>
        {participants.map((empleado) => {
          const id = empleado.id
          return (
            <Fragment key={id}>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`checkbox-${id}`}
                  checked={selectedIds.has(id)}
                  onCheckedChange={() => toggleSelect(id)}
                />
                <label
                  htmlFor={`checkbox-${id}`}
                  className="text-sm font-medium leading-none"
                >
                  {empleado.firstName || empleado.lastName || empleado.fullName || "Sin nombre"}
                </label>
              </div>
              <Separator className="my-2" />
            </Fragment>
          )
        })}
      </div>
    </ScrollArea>
  )
}

export default ScrollAreaUsers
