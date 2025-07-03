import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchQuote = () => {
  const { getModel } = useCrud('/sales/quotes')

  const fetchQuote = async () => {
    const response = await getModel('/sales/quotes')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['quote'],
    queryFn: fetchQuote,
  })
}

export default useFetchQuote