'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LeadForm from '@/modules/crm/leads/insert/LeadForm';
import { useState } from 'react';

const InsertManual = () => {
  // Añade valores por defecto para todos los campos
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
  
  const [isOrganic, setIsOrganic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log('Datos del formulario:', {
      ...data,
      is_organic: isOrganic ? 'yes' : 'no'
    });
    
    setTimeout(() => {
      setLoading(false);
      methods.reset();
      setShowForm(false);
      alert('Lead registrado exitosamente (simulación)');
    }, 1500);
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
              isOrganic={isOrganic}
              setIsOrganic={setIsOrganic}
            />
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default InsertManual;