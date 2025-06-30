import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchDepartments = () => {
  const { getModel } = useCrud('/rrhh/department')

  const fetchDepartments = async () => {
    const response = await getModel('/rrhh/department')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['departamento'],
    queryFn: fetchDepartments,
  })
}

export default useFetchDepartments