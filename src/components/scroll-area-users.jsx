import React, { useEffect, Fragment } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Checkbox } from "./ui/checkbox"
import { Separator } from "./ui/separator"
import useCrud from "@/hooks/useCrud"

const ScrollAreaUsers = ({ selectedIds, setSelectedIds, refreshFlag }) => {
  const [empleados, setEmpleados] = React.useState([])
  const { getModel } = useCrud("/planning/participant")

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const data = await getModel()
        setEmpleados(data)
      } catch (error) {
        console.error("Error al cargar los participantes:", error)
      }
    }
    fetchEmpleados()
  }, [refreshFlag])

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
    <ScrollArea className="h-40 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Empleados</h4>
        {empleados.map((empleado) => {
          const id = empleado.participant_id
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
                  {empleado.nombre || empleado.participant_name || empleado.fullName || "Sin nombre"}
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
