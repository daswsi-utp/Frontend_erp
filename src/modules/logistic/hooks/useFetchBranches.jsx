// src/modules/logistic/hooks/useFetchBranches.js
import { useQuery } from '@tanstack/react-query';
import useCrud from '@/hooks/useCrud';

const useFetchBranches = () => {
  const { getModel } = useCrud('/logistic/branches');

  const fetchBranches = async () => {
    const data = await getModel('/logistic/branches');
    return data;
  };

  return useQuery({
    queryKey: ['branches'],
    queryFn: fetchBranches,
  });
};

export default useFetchBranches;