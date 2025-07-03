import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchSale = () => {
  const { getModel } = useCrud('/sales/transactions')

  const fetchSale = async () => {
    const response = await getModel('/sales/transactions')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['sale'],
    queryFn: fetchSale,
  })
}

export default useFetchSale