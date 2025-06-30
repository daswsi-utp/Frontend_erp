import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchRoles = () => {
  const { getModel } = useCrud('/rrhh/role')

  const fetchRoles = async () => {
    const response = await getModel('/rrhh/role')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['role'],
    queryFn: fetchRoles,
  })
}

export default useFetchRoles