'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/shared/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FaExclamationTriangle } from 'react-icons/fa';
import { RxInfoCircled } from 'react-icons/rx';
import useCrud from '@/hooks/useCrud1';
import { useState, useEffect } from 'react';

const LeadForm = ({ loading, showForm, setShowForm, setSearchError, searchError }) => {
  const { control, watch, setValue } = useFormContext();
  const phone = watch('phone');
  const product_id = watch('product_id');

  const { getModel } = useCrud('');

  const [listProducts, setListProducts] = useState([]);
  const [listSellers, setListSellers] = useState([]);
  const [listArrivalMeans, setListArrivalMeans] = useState([]);
  const [existingInOtherProducts, setExistingInOtherProducts] = useState([]);

  // Carga productos
  const loadProducts = async () => {
    try {
      const products = await getModel('/crm/products');
      setListProducts(products || []);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  // Carga vendedores
  const loadSellers = async () => {
    try {
      const sellers = await getModel('/crm/members');
      setListSellers(
        (sellers || []).map(seller => ({
          value: seller.id,
          label: seller.fullName || `${seller.firstName} ${seller.lastName}`
        }))
      );
    } catch (error) {
      console.error('Error cargando vendedores:', error);
    }
  };

  // Carga medios de llegada
  const loadArrivalMeans = async () => {
    try {
      const arrivalMeans = await getModel('/crm/arrival_means');
      setListArrivalMeans(arrivalMeans || []);
    } catch (error) {
      console.error('Error cargando medios de llegada:', error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadSellers();
    loadArrivalMeans();
  }, []);

  // Verificar si el lead ya existe en backend
  const handleCheckLead = async () => {
    setSearchError(null);
    setExistingInOtherProducts([]);
    setShowForm(false);

    if (!phone || !product_id) {
      setSearchError('Debe ingresar teléfono y seleccionar producto');
      return;
    }

    try {
      // La respuesta debe tener la estructura esperada:
      // { existsInSameProduct: boolean, existingInOtherProducts: Array<{name, productName}> }
      const response = await getModel(`/crm/clients/check?phone=${encodeURIComponent(phone)}&product_id=${product_id}`);

      if (response?.existsInSameProduct) {
        setSearchError('Este cliente ya está registrado en este producto');
        return;
      }

      if (response?.existingInOtherProducts?.length > 0) {
        setExistingInOtherProducts(response.existingInOtherProducts);

        const [existingLead] = response.existingInOtherProducts;
        const nameParts = existingLead.name.split(' ');
        setValue('first_name', nameParts[0] || '');
        setValue('last_name', nameParts[1] || '');
      }

      setShowForm(true);
    } catch (error) {
      setSearchError('Error al buscar el cliente');
      console.error('Error en handleCheckLead:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Teléfono y producto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Número de Teléfono</Label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'El teléfono es obligatorio' }}
            render={({ field }) => <Input {...field} placeholder="Ingrese el teléfono" />}
          />
        </div>

        <div>
          <Label>Producto</Label>
          <div className="flex gap-2 mt-1">
            <Controller
              name="product_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={!phone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {listProducts.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Button type="button" onClick={handleCheckLead} disabled={!phone || !product_id}>
              Buscar
            </Button>
          </div>
        </div>
      </div>

      {/* Mensajes de error o info */}
      {searchError && (
        <Alert variant="destructive" className="mt-4">
          <FaExclamationTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{searchError}</AlertDescription>
        </Alert>
      )}

      {existingInOtherProducts.length > 0 && (
        <Alert className="mt-4 bg-blue-50 border-blue-200">
          <RxInfoCircled className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Información</AlertTitle>
          <AlertDescription className="text-blue-700">
            Este cliente ya está registrado en otros productos:
            <ul className="list-disc pl-5 mt-1">
              {existingInOtherProducts.map((lead, index) => (
                <li key={index}>
                  {lead.productName} (Registrado como: {lead.name})
                </li>
              ))}
            </ul>
            Puede continuar con el registro en este producto.
          </AlertDescription>
        </Alert>
      )}

      {/* Formulario con campos del cliente */}
      {showForm && !searchError && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Nombres</Label>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: 'El nombre es obligatorio' }}
                render={({ field }) => <Input {...field} placeholder="Ingrese los nombres" />}
              />
            </div>

            <div>
              <Label>Apellidos</Label>
              <Controller
                name="last_name"
                control={control}
                rules={{ required: 'El apellido es obligatorio' }}
                render={({ field }) => <Input {...field} placeholder="Ingrese los apellidos" />}
              />
            </div>

            <div>
              <Label>País</Label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Ingrese el país" />}
              />
            </div>

            <div>
              <Label>Asesor Comercial</Label>
              <Controller
                name="user_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un asesor" />
                    </SelectTrigger>
                    <SelectContent>
                      {listSellers.map(seller => (
                        <SelectItem key={seller.value} value={seller.value}>
                          {seller.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label>Medio de llegada</Label>
              <Controller
                name="arrival_mean_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="¿Cómo nos encontró?" />
                    </SelectTrigger>
                    <SelectContent>
                      {listArrivalMeans.map(mean => (
                        <SelectItem key={mean.id} value={mean.id}>
                          {mean.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar Lead'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LeadForm;
