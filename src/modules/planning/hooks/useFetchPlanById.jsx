import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchPlanById = (id) => {
  const { getModel } = useCrud(`/planning/plan/${id}`)

  const fetchPlans = async () => {
    const response = await getModel(`/planning/plan/${id}`)
    return response
  }

  return useQuery({
    queryKey: ['plan'],
    queryFn: fetchPlans,
  })
}

export default useFetchPlanById