// src/modules/logistic/hooks/useFetchProviders.ts
import { useQuery } from '@tanstack/react-query';
import useCrud from '@/hooks/useCrud';

const useFetchProviders = () => {
  const { getModel } = useCrud('/logistic/providers');

  const fetchProviders = async () => {
    const data = await getModel('/logistic/providers');
    return {
      rows: data,
      rowCount: data.length,
    };
  };

  return useQuery({
    queryKey: ['providers'],
    queryFn: fetchProviders,
  });
};

export default useFetchProviders;