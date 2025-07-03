import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchProducts = ({ pagination, search, searchFields }) => {
  const { getModel: getProducts } = useCrud('/crm/products')

  const fetchProducts = async ({ queryKey }) => {
    const [_key, { pageIndex, pageSize, search, searchFields }] = queryKey

    let url = `/crm/products/list?page=${pageIndex}&pageSize=${pageSize}`

    if (search && searchFields) {
      const searchFieldsStr = searchFields.join(',');  // Convierte los campos de búsqueda en un string separado por comas
      url += `&search_params=${search}&search_fields=${searchFieldsStr}`;
    }

    const response = await getProducts(url)
    return {
      rows: response.products,
      rowCount: response.total_products,
    }
  }

  return useQuery({
    queryKey: ['products', { pageIndex: pagination.pageIndex, pageSize: pagination.pageSize, search, searchFields }],
    queryFn: fetchProducts,
    keepPreviousData: true, // Mantiene los datos previos mientras carga los nuevos
  })
}

export default useFetchProducts
