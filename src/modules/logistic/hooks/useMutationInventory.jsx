// src/modules/logistic/hooks/useMutationInventory.js
import useEntityMutation from '@/hooks/useEntityMutation';

const useMutationInventory = () => {
  // 'inventory' será el queryKey bajo el que React Query cachea los datos
  return useEntityMutation('inventory');
};

export default useMutationInventory;