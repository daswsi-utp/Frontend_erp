import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/shared/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import GeneralTooltip from "@/components/shared/generalTooltip";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  capitalize,
  lettersOnly,
  regionNames,
} from "@/lib/auxiliarFunctions";
import lookup from "country-code-lookup";
import Switch from "react-switch";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";
import useEntityMutation from "@/hooks/useEntityMutation";


const LeadsImportTable = (props) => {
  const { data, productsAvailable } = props

  const [isLoading, setIsLoading] = useState(true);
  const [finalData, setFinalData] = useState([]);
  const [selected, setSelected] = useState("");
  const [validated, setValidated] = useState(false);
  const [qualityLead, setQualityLead] = useState(false);
  const mutation = useEntityMutation('leads')

  const methods = useForm();

  const layoutCallback = () => {
    setValidated(false);
    setFinalData([]);
    setTimeout(() => {
      setIsLoading(false);
      window.location.reload();
    }, 1000);
    return null;
  };



  const handleInsertLeads = async () => {
    try {
      const leadsToInsert = finalData.map(client => ({
        first_name: client.first_name,
        last_name: client.last_name,
        phone: formatPhoneNumber(client.phone, client.country_code),
        whatsapp: formatPhoneNumber(client.whatsapp, client.country_code),
        productId: Number(client.product_id),
        memberId: 6, 
        clientStateId: 1,
        is_quality: client.quality_lead === "is_quality",
        reasonId: 1,
        arrivalMeanId: 1,
        email: client.email,
        country: client.country,
        country_code: client.country_code,
        city: client.city || "Sin definir",
        jobTitle: client.jobTitle || "Sin definir",
        notes: client.notes || "Sin notas",
        birth_date: client.birth_date || null,
      }));
  
  
      const payload = {
        data: leadsToInsert
      };
  
      await mutation.mutateAsync({
        action: 'create',
        entity: payload, 
        apiPath: "/crm/clients/insert-leads"
      });
  
    } catch (error) {
      console.error("Error al crear los leads:", error.response?.data || error);
    } layoutCallback();
  }
  
  
  const formatPhoneNumber = (phone, countryCode) => {
    if (!phone || phone === "Sin definir") return phone;
    
    const cleaned = phone.replace(/\D/g, '');
    
    let dialCode = "+51"; 
    if (countryCode) {
      const country = lookup.byIso(countryCode);
      if (country && country.dial) {
        dialCode = `+${country.dial.replace(/\D/g, '')}`;
      }
    }
    
    if (cleaned.startsWith(dialCode.replace('+', ''))) {
      return `+${cleaned}`;
    }
    
    if (/^\+?\d+$/.test(phone)) {
      return phone.startsWith('+') ? phone : `+${phone}`;
    }
    
    return `${dialCode}${cleaned}`;
  };

  const middlewareInsertLeads = async (event) => {
    event.preventDefault();
    if (selected === "") {
      setValidated(true);
      return;
    }
    await handleInsertLeads();
  };


  const getCountryData = (_client) => {
    if (_client.country === undefined) {
      return {
        name: regionNames.of("PE"),
        code: "PE",
      };
    } else if (_client.country.length > 2) {
      return {
        name: capitalize(_client.country),
        code: lookup.byCountry(_client.country)?.iso2 || "PE",
      };
    } else {
      return {
        name: regionNames.of(_client.country) || "Perú",
        code: _client.country,
      };
    }
  };

  const getCityData = (_client) => {
    if (_client.ciudad === undefined) {
      return "Sin definir";
    } else {
      return lettersOnly(_client.ciudad);
    }
  };

  const getPhoneNumber = (_client) => {
    if (_client.phone_number === undefined) {
      return "Sin definir";
    } else {
      return _client.phone_number
        ?.replace(/\s/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/-/g, "")
        .replace(/\:/g, "")
        .replace(/\p/g, "") || "Sin definir";
    }
  };


  const getWhatsAPPNumber = (_client) => {
    if (_client.whatsapp === undefined) {
      return getPhoneNumber(_client);
    } else {
      return _client.whatsapp
        ?.replace(/\s/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/-/g, "")
        .replace(/\:/g, "")
        .replace(/\p/g, "") || "Sin definir";
    }
  };

  const getFullName = (_client) => {
    let aux = lettersOnly(_client.full_name)?.split(" ") || []
    const res = {
      first_name: "",
      last_name: "",
    };
    let first_name = ""
    let last_name = ""
    let i = 0;

    if (aux.length > 1) {
      while (i < aux.length) {
        if (i < Math.trunc(aux.length / 2)) {
          first_name = first_name + capitalize(aux[i])
          first_name = first_name + " "
        } else {
          if (aux[i] !== undefined) {
            last_name = last_name + capitalize(aux[i])
            last_name = last_name + " "
          }
        }
        i++;
      }
    } else {
      first_name = aux[0] || "Sin nombre"
    }
    res.first_name = first_name.trim()
    res.last_name = last_name.trim()

    return res
  }

  const formatearFecha = (fechaOriginal) => {
    if (!fechaOriginal) return "Sin fecha";
    let fechaFormateada;
    if (fechaOriginal.includes("/")) {
      const [mes, dia, anho] = fechaOriginal.split("/");
      fechaFormateada = `${dia}-${mes}-${anho}`;
    } else if (fechaOriginal.includes("-")) {
      fechaFormateada = fechaOriginal;
    } else {
      return "Formato no reconocido";
    }
    const [anho, mes, dia] = fechaFormateada.split("-")
    return `${dia}-${mes}-${anho}`
  }

  const sanitizeData = () => {
    const auxData = []
    props.data._data.forEach((client) => {
      auxData.push({
        first_name: getFullName(client).first_name,
        last_name: getFullName(client).last_name,
        phone: getPhoneNumber(client),
        country: getCountryData(client).name,
        country_code: getCountryData(client).code,
        whatsapp: getWhatsAPPNumber(client),
        city: getCityData(client),
        email: client.email || "Sin email",
        product_name: "Sin escoger un producto",
        product_id: selected,
        notes: client.adset_name,
        education_level: client.education_level,
        birth_date: null,
        jobTitle: client.company_position,
        company: client.company,
        created_time: client.created_time,
        form_name: client.form_name,
        quality_lead: qualityLead ? "is_quality" : "no_quality",
      })
    })
    setFinalData(auxData)
  }

  const changeStatus = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }

  const handleChange = (event) => {
    const value = event.target.value
    setSelected(value)
    setValidated(value === "")

    const auxData = finalData.map(client => ({
      ...client,
      product_id: value,
      product_name: value === ""
        ? "Sin escoger un producto"
        : event.target.options[event.target.selectedIndex].text
    }))
    setFinalData(auxData)
  }

  useEffect(() => {
    changeStatus()
    sanitizeData()
  }, [])

  useEffect(() => {
    sanitizeData()
  }, [qualityLead])



  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <Button
            size="sm"
            variant="success"
            onClick={middlewareInsertLeads}
            className="font-bold dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Insertar los datos procesados
          </Button>
          <GeneralTooltip content="Marca esta casilla si estos leads son de calidad.">
            <Switch
              size="lg"
              id="qualityLead"
              label="Lead de calidad?"
              className="ml-3"
              checked={qualityLead}
              onChange={() => setQualityLead(!qualityLead)}
            />
          </GeneralTooltip>
        </div>

        <div>
          <form onSubmit={middlewareInsertLeads} className="space-y-4">
            <FormItem>
              <FormLabel htmlFor="product_id" className="font-bold">
                Producto de Interés
              </FormLabel>
              <FormControl>
                <select
                  id="product_id"
                  name="product_id"
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-primary focus:border-primary sm:text-sm
                  text-gray-900 bg-white"                  value={selected}
                >
                  <option value="">Seleccione una opción</option>
                  {productsAvailable.map((product, index) => (
                    <option key={index} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              {validated && selected === "" && (
                <FormMessage className="font-bold text-red-500">
                  Selecciona un producto para continuar.
                </FormMessage>
              )}
            </FormItem>
          </form>
        </div>
      </div>

      {isLoading ? (
        <Spinner color="primary" variant="grow" />
      ) : (
        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {data._header.map((header, index) => (
                  <TableHead key={index}>{header.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalData.map((client, index) => (
                <TableRow key={index}>
                  <TableCell>TableCell{client.first_name}</TableCell>
                  <TableCell>{client.last_name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.whatsapp}</TableCell>
                  <TableCell>{client.country}</TableCell>
                  <TableCell>{client.product_name}</TableCell>
                  <TableCell>{client.product_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </FormProvider>
  )
}

export default LeadsImportTable
