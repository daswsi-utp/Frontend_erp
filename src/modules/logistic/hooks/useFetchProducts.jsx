// src/modules/logistic/hooks/useFetchProducts.ts
import { useQuery } from '@tanstack/react-query';
import useCrud from '@/hooks/useCrud';

const useFetchProducts = () => {
  const { getModel } = useCrud('/logistic/products');

  const fetchProducts = async () => {
    const data = await getModel('/logistic/products');
    return {
      rows: data,
      rowCount: data.length,
    };
  };

  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};

export default useFetchProducts;