// src/modules/logistic/hooks/useFetchInventory.js
import { useQuery } from '@tanstack/react-query';
import useCrud from '@/hooks/useCrud';

const useFetchInventory = () => {
  const { getModel } = useCrud('/logistic/inventory');

  const fetchInventory = async () => {
    const data = await getModel('/logistic/inventory');
    return data;
  };

  return useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory,
  });
};

export default useFetchInventory;