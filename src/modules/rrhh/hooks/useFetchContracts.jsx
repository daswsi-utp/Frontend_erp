import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchContracts = () => {
  const { getModel } = useCrud('/rrhh/contract')

  const fetchContracts = async () => {
    const response = await getModel('/rrhh/contract')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['contract'],
    queryFn: fetchContracts,
  })
}

export default useFetchContracts