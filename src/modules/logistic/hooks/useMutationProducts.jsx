// src/modules/logistic/hooks/useMutationProducts.ts
import useEntityMutation from "@/hooks/useEntityMutation";

const useMutationProducts = () => {
  return useEntityMutation("products");
};

export default useMutationProducts;