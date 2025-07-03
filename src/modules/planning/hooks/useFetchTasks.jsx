import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchTasks = (id) => {
  const { getModel } = useCrud(`/planning/task/plan/${id}`)

  const fetchTasks = async () => {
    const response = await getModel(`/planning/task/plan/${id}`)
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['task'],
    queryFn: fetchTasks,
  })
}

export default useFetchTasks