'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/shared/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectGroup } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FaExclamationTriangle } from 'react-icons/fa'
import { RxInfoCircled } from 'react-icons/rx'
import useCrud from '@/hooks/useCrud'
import { useState, useEffect } from 'react'
import { countries } from '@/lib/countries'

const LeadForm = ({ loading, showForm, setShowForm, setSearchError, searchError }) => {
  const { control, watch, setValue } = useFormContext()
  const phone = watch('phone')
  const productId = watch('productId')

  const { getModel } = useCrud()

  const [listProducts, setListProducts] = useState([])
  const [listSellers, setListSellers] = useState([])
  const [listArrivalMeans, setListArrivalMeans] = useState([])
  const [existingInOtherProducts, setExistingInOtherProducts] = useState([])
  const [listClientStates, setListClientStates] = useState([])
  const [searchTermProduct, setSearchTermProduct] = useState('')
  const [searchTermCountry, setSearchTermCountry] = useState('')

  const loadClientStates = async () => {
    try {
      const clientStates = await getModel('/crm/client_states')
      const statesArray = Array.isArray(clientStates) ? clientStates : clientStates.data || []

      setListClientStates(statesArray)
    } catch (error) {
      console.error('Error cargando estados de cliente:', error)
    }
  }

  const loadProducts = async () => {
    try {
      const products = await getModel('/crm/products')
      const productsArray = Array.isArray(products) ? products : products.data || []

      setListProducts(
        (productsArray || []).map((product) => ({
          id: product.id,
          name: product.name,
          pricePen: product.pricePen,
          priceDollar: product.priceDollar,
          description: product.description,
        }))
      )
    } catch (error) {
      console.error('Error cargando productos:', error)
    }
  }

  const loadSellers = async () => {
    try {
      const sellers = await getModel('/crm/members')
      const sellerArray = Array.isArray(sellers) ? sellers : sellers.data || []

      setListSellers(
        (sellerArray || []).map((seller) => ({
          id: seller.id,
          comercial: seller.fullName || `${seller.firstName} ${seller.lastName}`,
        }))
      )
    } catch (error) {
      console.error('Error cargando vendedores:', error)
    }
  }

  const loadArrivalMeans = async () => {
    try {
      const arrivalMeans = await getModel('/crm/arrival_means')
      setListArrivalMeans(arrivalMeans || [])
    } catch (error) {
      console.error('Error cargando medios de llegada:', error)
    }
  }

  useEffect(() => {
    loadProducts()
    loadSellers()
    loadArrivalMeans()
    loadClientStates()
  }, [])

  const handleCheckLead = async () => {
    setSearchError(null)
    setExistingInOtherProducts([])
    setShowForm(false)
  
    if (!phone || !productId) {
      setSearchError('Debe ingresar teléfono y seleccionar producto')
      return
    }
  
    try {
      const response = await getModel(
        `/crm/clients/check?phone=${encodeURIComponent(phone)}&productId=${productId}`
      )
  
      if (response === 'Cliente ya registrado en este producto') {
        setSearchError('Este cliente ya está registrado en este producto')
        return
      }
  
      if (response?.existingInOtherProducts?.length > 0) {
        setExistingInOtherProducts(response.existingInOtherProducts)
  
        const [existingLead] = response.existingInOtherProducts
        const nameParts = existingLead.name.split(' ')
        setValue('first_name', nameParts[0] || '')
        setValue('last_name', nameParts[1] || '')
      }
  
      setShowForm(true)
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setSearchError('Este cliente ya está registrado en este producto')
      } else {
        setSearchError('cliente ya está registrado')
      }
      console.error('Error en handleCheckLead:', error)
    }
  }
  


  const handleCountryChange = (selectedCountryCode) => {
    const selectedCountry = countries.find(country => country.country_code === selectedCountryCode);

    if (selectedCountry) {
      setValue('country', selectedCountry.name, { shouldValidate: true });
      setValue('countryCode', selectedCountry.country_code, { shouldValidate: true });
      setValue('phoneCode', selectedCountry.phone_code, { shouldValidate: true });
    }
  };

  const filteredProducts = listProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTermProduct.toLowerCase())
  )

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTermCountry.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div >
          <Label>Número de Teléfono</Label>
          <br />
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'El teléfono es obligatorio' }}
            render={({ field }) => <Input {...field} placeholder="Ingrese el teléfono" />}
          />
        </div>

        <div>
          <Label>Productos</Label>

          <div className="flex gap-2 mt-6">
            <Controller
              name="productId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={!phone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <Input
                        type="text"
                        placeholder="Buscar Producto"
                        value={searchTermProduct}
                        onChange={(e) => setSearchTermProduct(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    {filteredProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Button type="button" onClick={handleCheckLead} disabled={!phone || !productId}>
              Buscar
            </Button>
          </div>
        </div>
      </div>

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

      {showForm && !searchError && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Nombres</Label>
              <br />
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'El nombre es obligatorio' }}
                render={({ field }) => <Input {...field} placeholder="Ingrese los nombres" />}
              />
            </div>

            <div>
              <Label>Apellidos</Label>
              <br />
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'El apellido es obligatorio' }}
                render={({ field }) => <Input {...field} placeholder="Ingrese los apellidos" />}
              />
            </div>

            <div>
              <Label>País</Label>
              <br />
              <Controller
                name="countryCode"  // Cambiado de "country" a "countryCode"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleCountryChange(value)
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un país">
                        {field.value ? countries.find(c => c.country_code === field.value)?.name : "Seleccione un país"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <div className="p-2">
                        <Input
                          type="text"
                          placeholder="Buscar País"
                          value={searchTermCountry}
                          onChange={(e) => setSearchTermCountry(e.target.value)}
                          className="mb-2"
                        />
                      </div>
                      {filteredCountries.map((country) => (
                        <SelectItem key={country.country_code} value={country.country_code}>
                          {country.name} ({country.phone_code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Label>Asesor Comercial</Label>
              <br />
              <Controller
                name="memberId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un asesor" />
                    </SelectTrigger>
                    <SelectContent>
                      {listSellers.map((seller) => (
                        <SelectItem key={seller.id} value={seller.id}>
                          {seller.comercial}
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
                name="arrivalMeanId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="¿Cómo nos encontró?" />
                    </SelectTrigger>
                    <SelectContent>
                      {listArrivalMeans.map((mean) => (
                        <SelectItem key={mean.id} value={mean.id}>
                          {mean.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label>Estado del Cliente</Label>
              <br />
              <Controller
                name="clientStateId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {listClientStates.map((state) => (
                        <SelectItem key={state.id} value={state.id}>
                          {state.name}
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
  )
}

export default LeadForm
