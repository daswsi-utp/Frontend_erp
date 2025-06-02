'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LeadForm from '@/modules/crm/leads/insert/LeadForm';
import { useState } from 'react';
import useCrud from '@/hooks/useCrud1';

const InsertManual = () => {
  const methods = useForm({
    defaultValues: {
      phone: '',
      product_id: '',
      first_name: '',
      last_name: '',
      country: '',
      user_id: '',
      arrival_mean_id: ''
    }
  });

  const { insertModel } = useCrud('/crm/clients');

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setSearchError(null);
    try {
      await insertModel({
        ...data,
        whatsapp: data.phone,
        clientStateId: 1,  // Por defecto Nuevo Cliente
        reasonId: 1       // Por defecto razón genérica
      });
      alert('Lead registrado exitosamente');
      methods.reset();
      setShowForm(false);
    } catch (error) {
      alert('Error al registrar el lead');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Registro Manual de Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <LeadForm 
              loading={loading}
              showForm={showForm}
              setShowForm={setShowForm}
              setSearchError={setSearchError}
              searchError={searchError}
            />
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default InsertManual;
