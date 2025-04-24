import React from "react";
import { useConfirm } from "@/components/shared/alert";
import { LuAlertOctagon } from "react-icons/lu";

const useCrud1 = (endpoint) => {
  const confirm = useConfirm();

  const mockProducts = [
    { id: 1, name: "Curso de React" },
    { id: 2, name: "Curso de Next.js" },
    { id: 3, name: "Curso de Node.js" }
  ];

  const mockLeads = {
    success: true,
    message: "Leads insertados correctamente (simulado)"
  };

  const getModel = async (_endpoint = endpoint) => {
    console.log(`Mock GET request to: ${_endpoint}`);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (_endpoint.includes("/products")) {
      return { products: mockProducts };
    }

    return { data: [] };
  };

  const deleteModel = async (_endpoint = endpoint) => {
    const confirmation = await confirm({
      title: "Eliminar item",
      body: "¿Estás seguro de que quieres eliminar este registro? No podrás recuperarlo una vez eliminado.",
      cancelButton: "Cancelar",
      actionButton: "Eliminar!",
      icon: <LuAlertOctagon className="text-red-500 h-16 w-16 mx-auto mb-4" />,
    });

    if (confirmation) {
      console.log(`Mock DELETE request to: ${_endpoint}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, message: "Registro eliminado correctamente (simulado)" };
    }

    return Promise.reject(new Error('Acción cancelada por el usuario'));
  };

  const insertModel = async (_data, _endpoint = endpoint) => {
    const confirmation = await confirm({
      title: "Registrar nuevo registro",
      body: "¿Estás seguro de que quieres ingresar este registro?",
      cancelButton: "Cancelar",
      actionButton: "Registrar",
      icon: <LuAlertOctagon className="text-red-500 h-16 w-16 mx-auto mb-4" />,
    });

    if (confirmation) {
      console.log(`Mock POST request to: ${_endpoint}`, _data);
      await new Promise(resolve => setTimeout(resolve, 500));

      if (_endpoint.includes("/leads")) {
        return mockLeads;
      }

      return { success: true, message: "Registro creado correctamente (simulado)" };
    }

    return Promise.reject(new Error('Acción cancelada por el usuario'));
  };


  const insertModel2 = async (_data, _endpoint = endpoint) => {
    console.log(`Mock POST request to: ${_endpoint}`, _data);
    await new Promise(resolve => setTimeout(resolve, 500));

    if (_endpoint.includes("/leads")) {
      return mockLeads;
    }

    return { success: true, message: "Registro creado correctamente (simulado)" };
  };

  const updateModel = async (_data, _endpoint = endpoint) => {
    const confirmation = await confirm({
      title: "Actualizar el registro",
      body: "¿Estás seguro de que quieres actualizar este registro?",
      cancelButton: "Cancelar",
      actionButton: "Actualizar",
      icon: <LuAlertOctagon className="text-red-500 h-16 w-16 mx-auto mb-4" />,
    });

    if (confirmation) {
      console.log(`Mock PUT request to: ${_endpoint}`, _data);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, message: "Registro actualizado correctamente (simulado)" };
    }

    return Promise.reject(new Error('Acción cancelada por el usuario'));
  };

  const insertModelWithCallback = async (data, _endpoint = endpoint) => {
    console.log(`Mock POST request with callback to: ${_endpoint}`, data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: "Registro creado con callback (simulado)" };
  };


  const searchModel = async (searchQuery = "", _endpoint = endpoint) => {
    try {
      console.log(`Mock SEARCH request to: ${_endpoint}?${searchQuery}`);
      await new Promise(resolve => setTimeout(resolve, 800));
  
      const mockSearchData = [
        {
          id: 1,
          full_name: "Juan Pérez",
          phone: "999888777",
          whatsapp: "999888777",
          email: "juan@example.com",
          country: "Perú",
          country_code: "pe",
          comercial: "Ana López",
          arrival_mean: "web",
          product_code: "REACT",
          product_name: "Curso de React",
          product_status: "active",
          client_state: "active",
          user_id: 1
        },
        {
          id: 2,
          full_name: "María García",
          phone: "999111222",
          whatsapp: "999111222",
          email: "maria@example.com",
          country: "México",
          country_code: "mx",
          comercial: "Carlos Méndez",
          arrival_mean: "facebook",
          product_code: "NEXTJS",
          product_name: "Curso de Next.js",
          product_status: "active",
          client_state: "pending",
          user_id: 2
        }
      ];
  
      const params = new URLSearchParams(searchQuery);
      const searchParams = params.get('search_params') || '';
      const searchFilters = params.get('search_filters') || '';
  
      const results = searchParams 
        ? mockSearchData.filter(item =>
            item.full_name.toLowerCase().includes(searchParams.toLowerCase()) ||
            item.phone.includes(searchParams) ||
            (searchFilters.includes('whatsapp') && item.whatsapp.includes(searchParams))
          )
        : mockSearchData;
  
      return { results, count: results.length };
    } catch (error) {
      console.error("Error searching data:", error);
      return Promise.reject(error);
    }
  }
  

  return {
    getModel,
    insertModel,
    deleteModel,
    updateModel,
    insertModelWithCallback,
    insertModel2,
    searchModel
  };
};

export default useCrud1