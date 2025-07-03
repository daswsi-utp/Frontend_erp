import useFetchProviders from "@/modules/logistic/hooks/useFetchProviders";

// Hook para obtener los proveedores
const { data: providersData, isLoading } = useFetchProviders();

// Acceso a las filas
const proveedores = providersData?.rows;
import useEntityMutation from "@/hooks/useEntityMutation";

// Hook para mutaciones
const providerMutation = useEntityMutation('providers');

// Crear proveedor
providerMutation.mutate({
  action: 'create',
  entity: formData,
  apiPath: '/logistic/providers'
});

// Actualizar proveedor
providerMutation.mutate({
  action: 'update',
  entity: formData,
  apiPath: `/logistic/providers/${formData.id_proveedor}`
});

// Eliminar proveedor
providerMutation.mutate({
  action: 'delete',
  id: proveedor.id_proveedor,
  entity: {},
  apiPath: `/logistic/providers/${proveedor.id_proveedor}`
});