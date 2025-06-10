"use client"
import { useQuery } from '@tanstack/react-query';
import useCrud from '../../../hooks/useCrud';

const useFetchEmployees = () => {
  const { getModel } = useCrud('')

  const fetchEmployees = async () =>{
    const response = await getModel("/rrhh/employee")
    console.log("fetchEmployees response:", response);
    return response;
  }

  return useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });
}

export default useFetchEmployees;