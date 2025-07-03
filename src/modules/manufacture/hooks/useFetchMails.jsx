import { useQuery } from '@tanstack/react-query'
import useCrud from '@/hooks/useCrud'

const useFetchMails = () => {
  const { getModel } = useCrud('/rrhh/contract')

  const fetchMail = async () => {
    const response = await getModel('/manufacture/mail')
    return {
      rows: response,
      rowCount: response.length,
    }
  }

  return useQuery({
    queryKey: ['mail'],
    queryFn: fetchMail,
  })
}

export default useFetchMails