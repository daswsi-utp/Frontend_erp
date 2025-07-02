'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LeadForm from '@/modules/crm/leads/insert/LeadForm';
import { useState } from 'react';
import useEntityMutation from '@/hooks/useEntityMutation';

const InsertManual = () => {
  const methods = useForm({
    defaultValues: {
      phone: '',
      productId: '',
      firstName: '',
      lastName: '',
      country: '',
      memberId: '',
      arrivalMeanId: '',
      clientStateId: "",
      countryCode: "",
      phoneCode: '',
      
    }
  })

  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const mutation = useEntityMutation('lead')


  const onSubmit = async (data) => {
    setLoading(true);
    setSearchError(null);
    try {

      const cleanedPhone = data.phone.replace(/\D/g, '');
    
      const test = data.phoneCode ? `${data.phoneCode}${cleanedPhone}`: `+51${cleanedPhone}`; // Default si no hay phoneCode


      await mutation.mutateAsync({
        action: 'create',
        entity: {
          ...data,
          whatsapp:  data.phone,
          clientStateId: data.clientStateId,
          reasonId: 1,
          countryCode: data.countryCode, 
          phone: test ,
        },
        apiPath: '/crm/clients'     

      })
      console.log(data)
      methods.reset();
      setShowForm(false);
    } catch (error) {
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
