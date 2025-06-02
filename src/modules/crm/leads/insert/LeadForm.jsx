'use client';

import { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/shared/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FaExclamationTriangle } from 'react-icons/fa';
import { RxInfoCircled } from 'react-icons/rx';
import useCrud from '@/hooks/useCrud';

const LeadForm = ({ loading, showForm, setShowForm, isOrganic, setIsOrganic }) => {
  const { control, watch, setValue } = useFormContext();
  const phone = watch('phone');
  const product_id = watch('product_id');

  const [searchError, setSearchError] = useState(null);
  const [existingInOtherProducts, setExistingInOtherProducts] = useState([]);

  const [listProducts, setListProducts] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  const [listArrivalMeans, setListArrivalMeans] = useState([]);

  const { getModelData } = useCrud('');

  // Cargar productos
  const loadProducts = async () => {
    try {
      const products = await getModelData('/crm/products');
      setListProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  // Cargar vendedores
  const loadSellers = async () => {
    try {
      const sellers = await getModelData('/crm/members');
      // Mapear para formato Select
      const sellersForSelect = sellers.map(seller => ({
        value: seller.id,
        label: seller.fullName || `${seller.firstName} ${seller.lastName}`,
      }));
      setSellerList(sellersForSelect);
    } catch (error) {
      console.error('Error loading sellers:', error);
    }
  };

  // Cargar medios de llegada
  const loadArrivalMeans = async () => {
    try {
      const arrivalMeans = await getModelData('/crm/arrival_means');
      setListArrivalMeans(arrivalMeans);
    } catch (error) {
      console.error('Error loading arrival means:', error);
    }
  };

  // Cargar datos al montar
  useEffect(() => {
    loadProducts();
    loadSellers();
    loadArrivalMeans();
  }, []);

  // Verificar si el lead ya existe (simulación o puedes cambiar para backend)
  const handleCheckLead = async () => {
    setSearchError(null);
    setExistingInOtherProducts([]);

    try {
      // Aquí deberías hacer llamada a backend para buscar el lead por teléfono y producto
      // Ejemplo con fetch o axios:
      // const response = await fetch(`/api/v1/crm/clients/check?phone=${phone}&product_id=${product_id}`);
      // const data = await response.json();

      // Por ahora simulamos con datos mock (puedes eliminar esta parte)
      // Simulación simple
      const existingLeads = []; // <- reemplaza con datos reales
      const existsInSameProduct = existingLeads.some(
        lead => lead.phone === phone && lead.product_id == product_id
      );

      if (existsInSameProduct) {
        setSearchError('Este cliente ya está registrado en este producto');
        setShowForm(false);
        return;
      }

      const otherProducts = existingLeads.filter(
        lead => lead.phone === phone && lead.product_id != product_id
      );

      if (otherProducts.length > 0) {
        setExistingInOtherProducts(otherProducts);
        const [existingLead] = otherProducts;
        const nameParts = existingLead.name.split(' ');
        setValue('first_name', nameParts[0]);
        setValue('last_name', nameParts[1] || '');
      }

      setShowForm(true);
    } catch (error) {
      console.error('Error checking lead:', error);
      setShowForm(false);
      setSearchError('Error al buscar el cliente');
    }
  };

  // Obtener nombre del producto para alertas
  const getProductName = (productId) => {
    return listProducts.find(p => p.id == productId)?.name || 'Producto';
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Número de Teléfono</Label>
          <br />
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'El teléfono es obligatorio' }}
            render={({ field }) => (
              <Input {...field} placeholder="Ingrese el teléfono" />
            )}
          />
        </div>

        <div>
          <Label>Producto</Label>
          <br />
          <div className="flex gap-2">
            <Controller
              name="product_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!phone}
                >
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
            <Button
              type="button"
              onClick={handleCheckLead}
              disabled={!phone || !product_id}
            >
              Buscar
            </Button>
          </div>
        </div>
      </div>

      {searchError && (
        <Alert variant="destructive" className="mt-4">
          <FaExclamationTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {searchError}
          </AlertDescription>
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
                  {getProductName(lead.product_id)} (Registrado como: {lead.name})
                </li>
              ))}
            </ul>
            Puede continuar con el registro en este producto.
          </AlertDescription>
        </Alert>
      )}

      {showForm && !searchError && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Nombres</Label>
              <br />
              <Controller
                name="first_name"
                control={control}
                rules={{ required: 'El nombre es obligatorio' }}
                render={({ field }) => (
                  <Input {...field} placeholder="Ingrese los nombres" />
                )}
              />
            </div>

            <div>
              <Label>Apellidos</Label>
              <br />
              <Controller
                name="last_name"
                control={control}
                rules={{ required: 'El apellido es obligatorio' }}
                render={({ field }) => (
                  <Input {...field} placeholder="Ingrese los apellidos" />
                )}
              />
            </div>

            <div>
              <Label>País</Label>
              <br />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un país" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Aquí deberías cargar países desde backend o tener una lista */}
                      <SelectItem value="Perú">Perú</SelectItem>
                      <SelectItem value="Colombia">Colombia</SelectItem>
                      <SelectItem value="México">México</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label>Asesor Comercial</Label>
              <br />
              <Controller
                name="user_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un asesor" />
                    </SelectTrigger>
                    <SelectContent>
                      {sellerList.map(seller => (
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
              <br />
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

            <div className="flex items-center space-x-2">
              <Switch
                id="organic"
                checked={isOrganic}
                onCheckedChange={setIsOrganic}
                disabled // Si no usas este campo, mejor deshabilita o elimina
              />
              <Label htmlFor="organic">Lead orgánico (No usado)</Label>
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
