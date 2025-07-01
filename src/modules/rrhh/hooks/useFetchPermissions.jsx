import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchPermissions = () => {
  const { getModel } = useCrud('/rrhh/permission')

  const fetchPermissions = async () => {
    const response = await getModel('/rrhh/permission')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['permission'],
    queryFn: fetchPermissions,
  })
}

export default useFetchPermissions