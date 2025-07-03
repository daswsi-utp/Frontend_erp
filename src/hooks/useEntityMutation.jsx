import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/shared/toast'
import useCrud from '@/hooks/useCrud'
import { AlertCircle, Info, CheckCircle } from 'lucide-react'
import { FaTasks } from 'react-icons/fa'


const entityTranslations = {
  products: "productos",
  contract: "contrato",
  leads: "lead",
  clients: "cliente",
  area: "área",
  employee: "empleado",
  department: "departamento",
  role: "role",
  contract: "contrato",
  vacation: "vacacion",
  permission: "permiso",
  mail: "correo",
  task: "tarea",
  plan: "plan",
  participant: "participante"
}

const useEntityMutation = (entityName) => {
  const { insertModel, updateModel, deleteModel, insertMultipartModel } = useCrud()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ action, entity, apiPath }) => {
      let payloadToSend = entity
      let isMultipart = false

      if (
        (action === 'create' || action === 'update') &&
        Array.isArray(entity?.brochures) &&
        entity.brochures.length > 0
      ) {
        isMultipart = true
        const formData = new FormData()

        entity.brochures.forEach((brochure, index) => {
          formData.append(`brochures[${index}][file]`, brochure.file)
          formData.append(`brochures[${index}][status]`, brochure.status)
        })

        for (const key in entity) {
          if (key !== 'brochures') {
            formData.append(`${entityName}[${key}]`, entity[key])
          }
        }

        payloadToSend = formData
      }

      switch (action) {
        case 'create':
          return await insertModel(payloadToSend, apiPath)
        case 'update':
          return await updateModel(payloadToSend, apiPath)
        case 'delete':
          return await deleteModel(apiPath)
        case 'custom':
          return await insertModel(payloadToSend, apiPath)
        case 'custom_update':
          return await updateModel(payloadToSend, apiPath)
        case 'create_multipart':
          return await insertMultipartModel(entity.data, entity.file, apiPath)
        default:
          throw new Error('Invalid action')
      }
    },
    onMutate: async ({ action, entity, id }) => {
      await queryClient.cancelQueries([entityName])
      const previousData = queryClient.getQueryData([entityName])

      queryClient.setQueryData([entityName], (old) => {
        if (action === 'create') {
          return {
            ...old,
            rows: [...(old?.rows || []), entity],
            rowCount: (old?.rowCount || 0) + 1,
          }
        } else if (action === 'update') {
          if (Array.isArray(old?.rows)) {
            return {
              ...old,
              rows: old.rows.map((item) => (item.id === id ? { ...item, ...entity } : item)),
            }
          } else {
            return {
              ...old,
              rows: [{ ...entity }],
            }
          }
        } else if (action === 'delete') {
          if (Array.isArray(old?.rows)) {
            return {
              ...old,
              rows: old.rows.filter((item) => item.id !== id),
              rowCount: (old?.rowCount || 1) - 1,
            }
          } else {
            return {
              ...old,
              rows: [],
              rowCount: 0,
            }
          }
        } else if (action === 'custom') {
          return old
        } else if (action === 'custom_update') {
          return old
        }
      })

      return { previousData }
    },
    onError: (error, { action }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([entityName], context.previousData)
      }
      const errorMessage = error?.errors ? error.errors.join(', ') : 'Asegúrate de tener lo requerido'
      toast({
        title: "Ocurrió un error!!",
        description: `No se pudo ${action === 'create' ? 'crear' : action === 'update' || action === 'custom_update' ? 'actualizar' : action === 'delete' ? 'eliminar' : 'completar la acción, '}${errorMessage}.`,
        action: <ToastAction altText="Cerrar">Cerrar</ToastAction>,
        variant: "destructive",
        icon: <AlertCircle className="text-red-500" />,
      })
    },
    onSuccess: (data, { action }) => {
      const translatedEntityName = entityTranslations[entityName] || entityName

      toast({
        title: "Operación exitosa",
        description: `El ${translatedEntityName} se ha ${action === 'create' ? 'creado' : action === 'update' || action === 'custom_update' ? 'actualizado' : action === 'delete' ? 'eliminado' : 'procesado'} correctamente.`,
        action: <ToastAction altText="Cerrar">Cerrar</ToastAction>,
        variant: "success",
        icon: <CheckCircle className="text-green-500" />,
      })
      queryClient.invalidateQueries([entityName])
    },
    onSettled: () => {
      queryClient.invalidateQueries([entityName])
    },
  })

  return mutation
}

export default useEntityMutation
