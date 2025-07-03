import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchParticipants = () => {
  const { getModel } = useCrud('/planning/plan')

  const fetchParticipants = async () => {
    const response = await getModel('/planning/participant')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['participant'],
    queryFn: fetchParticipants,
  })
}

export default useFetchParticipants