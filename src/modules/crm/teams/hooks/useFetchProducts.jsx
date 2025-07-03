import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchProducts = ({ pagination, search, searchFields }) => {
  const { getModel: getProducts } = useCrud('/crm/products')

  const fetchProducts = async ({ queryKey }) => {
    const [_key, { pageIndex, pageSize, search, searchFields }] = queryKey
    const response = await getProducts(`/crm/products?page=${pageIndex + 1}&pageSize=${pageSize}&search_params=${search}&search_fields=${searchFields.join(',')}`)
    return {
      rows: response.products,
      rowCount: response.total_products,
    }
  }

  return useQuery({
    queryKey: ['products', { pageIndex: pagination.pageIndex, pageSize: pagination.pageSize, search, searchFields }],
    queryFn: fetchProducts,
    keepPreviousData: true,
  })
}

export default useFetchProducts
