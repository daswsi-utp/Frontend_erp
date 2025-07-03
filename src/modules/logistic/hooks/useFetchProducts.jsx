import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchProducts = () => {
  const { getModel } = useCrud('/logistic/products')

  const fetchProduct = async () => {
    const response = await getModel('/logistic/products')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['product'],
    queryFn: fetchProduct,
  })
}

export default useFetchProducts