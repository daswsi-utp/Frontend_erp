import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchPlans = () => {
  const { getModel } = useCrud('/planning/plan')

  const fetchPlans = async () => {
    const response = await getModel('/planning/plan')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['plan'],
    queryFn: fetchPlans,
  })
}

export default useFetchPlans