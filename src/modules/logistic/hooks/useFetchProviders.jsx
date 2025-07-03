import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchProviders = () => {
  const { getModel } = useCrud('/logistic/providers')

  const fetchProvider = async () => {
    const response = await getModel('/logistic/providers')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['provider'],
    queryFn: fetchProvider,
  })
}

export default useFetchProviders