import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchEmployees = () => {
  const { getModel } = useCrud('/rrhh/employee')

  const fetchEmployees = async () => {
    const response = await getModel('/rrhh/employee')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['empleado'],
    queryFn: fetchEmployees,
  })
}

export default useFetchEmployees