// src/modules/logistic/hooks/useMutationBranches.js
import useEntityMutation from '@/hooks/useEntityMutation';

const useMutationBranches = () => {
  return useEntityMutation('branches');
};

export default useMutationBranches;