import { useMutation } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchLeads = () => {
  const { getModel } = useCrud()

  return useMutation({
    mutationFn: async ({ searchParams, filters }) => {
      const params = new URLSearchParams()
      params.append('search_params', searchParams)
      filters.forEach(f => params.append('search_filters', f))

      const result = await getModel(`/crm/clients/search?${params.toString()}`)
      return result.results
    },
  })
}

export default useFetchLeads
