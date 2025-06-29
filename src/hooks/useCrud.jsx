import React from "react"
import axios from "axios"
import { useConfirm } from "@/components/shared/alert"
import { LuAlertOctagon  } from "react-icons/lu";
import { OctagonAlert } from 'lucide-react';


const backend_host =  process.env.NEXT_PUBLIC_BACKEND_HOST ;

const useCrud = (endpoint) => {
  const confirm = useConfirm()

  const getModel = async (_endpoint = endpoint) => {

    try {
      const response = await axios.get(`${backend_host}${_endpoint}`)
      const url = `${backend_host}${_endpoint}`;
      console.log("URL para la solicitud GET:", url); 

      return response.data
    } catch (error) {
      console.error("Error fetching data:", error)
      return Promise.reject(error.response?.data || error)
    }
  }

  const deleteModel = async (_endpoint = endpoint) => {
    const confirmation = await confirm({
      title: "Eliminar item",
      body: "¿Estás seguro de que quieres eliminar este registro? No podrás recuperarlo una vez eliminado.",
      cancelButton: "Cancelar",
      actionButton: "Eliminar!",
      icon: <OctagonAlert className="text-red-500 h-16 w-16 mx-auto mb-4" />,
    })
    if (confirmation) {

      try {
        const response = await axios.delete(`${backend_host}${_endpoint}`)
        return response.data
      } catch (error) {
        console.error('Error al eliminar el registro:', error)
        return Promise.reject(error.response?.data || error)
      }
    }
  }


  const insertModel = async (_data, _endpoint = endpoint) => {
    const confirmation = await confirm({
      title: "Registrar nuevo registro",
      body: "¿Estás seguro de que quieres ingresar este registro?",
      cancelButton: "Cancelar",
      actionButton: "Registrar",
      icon: <OctagonAlert className="text-red-500 h-16 w-16 mx-auto mb-4" />,
    })
    if (!confirmation) {
      throw new Error('Acción cancelada por el usuario');
    }
    try {
      const response = await axios.post(`${backend_host}${_endpoint}`, _data)
      return response.data
    } catch (error) {
      if (error.response) {
        console.error('Error al registrar el registro:', error)
        return Promise.reject(error.response.data)
      } else {
        console.error('Network error or server is not responding:', error)
        return Promise.reject({ message: error.response.message })
      }
    }
  }



  const updateModel = async (_data, _endpoint = endpoint) => {
    const confirmation = await confirm({
      title: "Actualizar el registro",
      body: "¿Estás seguro de que quieres actualizar este registro?",
      cancelButton: "Cancelar",
      actionButton: "Actualizar",
      icon: <OctagonAlert className="text-red-500 h-16 w-16 mx-auto mb-4" />,
    })
    if (!confirmation) {
      throw new Error('Acción cancelada por el usuario');
    }
    try {
      const response = await axios.put(`${backend_host}${_endpoint}`, _data)
      return response.data
    } catch (error) {
      if (error.response) {
        console.error('Error al actualizar el registro:', error)
        return Promise.reject(error.response.data)
      } else {
        console.error('Network error or server is not responding:', error)
        return Promise.reject({ message: 'Network error or server is not responding' })
      }
    }
  }

  const searchModel = async (queryString, _endpoint = endpoint) => {
    try {
      const response = await axios.get(`${backend_host}${_endpoint}?${queryString}`)
      return response.data
    } catch (error) {
      console.error("Error en búsqueda:", error)
      return Promise.reject(error.response?.data || error)
    }
  }
  

  const insertModelWithCallback = async (data, _endpoint = endpoint) => {
    try {
      const response = await axios.post(_endpoint, data);
      if (response.status === 200) {
        setToast(response);
        return response;
      }
    } catch (error) {
      setToast(error.response.data);
    }
  };

  const insertMultipartModel = async (contractData, file, _endpoint = endpoint) => {
    const confirmation = await confirm({
      title: "Registrar nuevo contrato",
      body: "¿Estás seguro de que quieres registrar este contrato con su archivo adjunto?",
      cancelButton: "Cancelar",
      actionButton: "Registrar",
      icon: <OctagonAlert className="text-red-500 h-16 w-16 mx-auto mb-4" />,
    });

    if (!confirmation) {
      throw new Error('Acción cancelada por el usuario');
    }

    const formData = new FormData();
    formData.append("contract", new Blob([JSON.stringify(contractData)], { type: "application/json" }));
    formData.append("file", file);

    try {
      const response = await axios.post(`${backend_host}${_endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error al registrar el contrato:', error);
        return Promise.reject(error.response.data);
      } else {
        console.error('Network error or server is not responding:', error);
        return Promise.reject({ message: 'Error de red o el servidor no responde' });
      }
    }
    };


  return {
    getModel,
    insertModel,
    deleteModel,
    updateModel,
    insertModelWithCallback,
    insertMultipartModel,
    searchModel 
  }
}

export default useCrud
