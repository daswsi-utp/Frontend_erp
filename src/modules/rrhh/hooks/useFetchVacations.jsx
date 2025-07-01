import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchVacations = () => {
  const { getModel } = useCrud('/rrhh/vacation')

  const fetchVacations = async () => {
    const response = await getModel('/rrhh/vacation')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['vacation'],
    queryFn: fetchVacations,
  })
}

export default useFetchVacations