// src/modules/logistic/hooks/useMutationSupplyings.jsx
import useCrud from '@/hooks/useCrud';

const useMutationSupplyings = () => {
  const { postModel } = useCrud('/logistic/supplyings');

  const createSupplying = async (data) => {
    return await postModel('/logistic/supplyings', data, true);
  };

  return { createSupplying };
};

export default useMutationSupplyings;