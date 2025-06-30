import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchLeads = (pagination, searchParams) => {
  const { getModel: getLeads } = useCrud('/api/v1/admin/Leads')

  const fetchLeads = async ({ queryKey }) => {
    const [_key, { pageIndex, pageSize, search, fields }] = queryKey
    const searchQuery = search ? `&search_params=${search}&search_fields=${fields}` : ''
    const response = await getLeads(`/api/v1/admin/Leads?page=${pageIndex + 1}&per_page=${pageSize}${searchQuery}`)
    return {
      rows: response.Leads,
      rowCount: response.total_Leads,
    }
  }

  return useQuery({
    queryKey: ['Leads', { ...pagination, search: searchParams.search, fields: searchParams.fields }],
    queryFn: fetchLeads,
    keepPreviousData: true,
  })
}

export default useFetchLeads
