import { useQuery } from '@tanstack/react-query';
import useCrud from '../useCrud';

const useFetchEmployees = () => {
  const { getModel } = useCrud('')

  const fetchEmployees = async () =>{
    const response = await getModel("/rrhh/employee")
    return response;
  }

  return useQuery({
    queryKey: ['employee'],
    queryFn: fetchEmployees,
  });
}

export default useFetchEmployees