import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form"; 
import Spinner from "@/components/shared/Spinner"; 
import { Button } from "@/components/shared/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import GeneralTooltip from "@/components/shared/generalTooltip";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import useCrud from "@/hooks/useCrud";
import {
  capitalize,
  lettersOnly,
  regionNames,
} from "@/lib/auxiliarFunctions";
import lookup from "country-code-lookup";
import Switch from "react-switch"; 
import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel } from "@/components/ui/select"; 
const LeadsImportTable = (props) => {
  const { data, coursesAvailable } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [finalData, setFinalData] = useState([]);
  const [selected, setSelected] = useState("");
  const [validated, setValidated] = useState(false);
  const [qualityLead, setQualityLead] = useState(false);
  const { insertModel: insertLeads } = useCrud("");

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
    const finalDataPost = { data: finalData };
    await insertLeads(finalDataPost, "/api/v1/crm/leads/insert_leads", layoutCallback);
  };

  const middlewareInsertLeads = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (selected !== "") await handleInsertLeads(event);
    }
    setValidated(true);
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
        code: lookup.byCountry(_client.country) && lookup.byCountry(_client.country).iso2,
      };
    } else {
      return {
        name: regionNames.of(_client.country),
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
        .replace(/\s/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/-/g, "")
        .replace(/\:/g, "")
        .replace(/\p/g, "");
    }
  };

  const getWhatsAPPNumber = (_client) => {
    if (_client.whatsapp === undefined) {
      return getPhoneNumber(_client);
    } else {
      return _client.whatsapp
        .replace(/\s/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/-/g, "")
        .replace(/\:/g, "")
        .replace(/\p/g, "");
    }
  };

  const getFullName = (_client) => {
    let aux = lettersOnly(_client.full_name).split(" ");
    const res = {
      first_name: "",
      last_name: "",
    };
    let first_name = "";
    let last_name = "";
    let i = 0;
    if (aux.length > 1) {
      while (i < aux.length) {
        if (i < Math.trunc(aux.length / 2)) {
          first_name = first_name + capitalize(aux[i]);
          first_name = first_name + " ";
        } else {
          if (aux[i] !== undefined) {
            last_name = last_name + capitalize(aux[i]);
            last_name = last_name + " ";
          }
        }
        i++;
      }
    } else {
      first_name = aux[0];
    }
    res.first_name = first_name;
    res.last_name = last_name;

    return res;
  };

  const formatearFecha = (fechaOriginal) => {
    let fechaFormateada;
    if (fechaOriginal && fechaOriginal.includes("/")) {
      const [mes, dia, anho] = fechaOriginal.split("/");
      fechaFormateada = `${dia}-${mes}-${anho}`;
    } else if (fechaOriginal && fechaOriginal.includes("-")) {
      fechaFormateada = fechaOriginal;
    } else {
      return "Formato de fecha no reconocido";
    }

    const [anho, mes, dia] = fechaFormateada.split("-");
    return `${dia}-${mes}-${anho}`;
  };

  const sanitizeData = () => {
    const auxData = [];
    props.data._data.map((client) => {
      auxData.push({
        first_name: getFullName(client).first_name,
        last_name: getFullName(client).last_name,
        phone: getPhoneNumber(client),
        country: getCountryData(client).name,
        country_code: getCountryData(client).code,
        whatsapp: getWhatsAPPNumber(client),
        city: getCityData(client),
        email: client.email,
        course_name: "Sin escoger un curso",
        course_id: selected,
        adset_name: client.adset_name,
        education_level: client.education_level,
        birth_date: formatearFecha(client.birth_date),
        company_position: client.company_position,
        company: client.company,
        created_time: client.created_time,
        form_name: client.form_name,
        quality_lead: qualityLead ? "is_quality" : "no_quality",
      });
    });
    setFinalData(auxData);
  };

  const changeStatus = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
    if (event.target.value === "") {
      setValidated(false);
    }
    const auxData = finalData;
    auxData.map((client) => {
      client.course_id = event.target.value;
      client.course_name =
        event.target.options[event.target.selectedIndex].text ===
          "Seleccione una opcion" ||
        event.target.options[event.target.selectedIndex].text === ""
          ? "Sin escoger un curso"
          : event.target.options[event.target.selectedIndex].text;
    });
    setFinalData(auxData);
  };

  useEffect(() => {
    changeStatus();
    sanitizeData();
  }, []);

  useEffect(() => {
    sanitizeData();
  }, [qualityLead]);

  return (
   
    <FormProvider {...methods}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <Button
            size="sm"
            variant="success"
            onClick={(e) => middlewareInsertLeads(e)}
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

        {/* Formulario para seleccionar curso */}
        <div>
          <form onSubmit={middlewareInsertLeads} className="space-y-4">
            <FormItem>
              <FormLabel htmlFor="course_id" className="font-bold">
                Curso de Interés
              </FormLabel>
              <FormControl>
                <Select
                  id="course_id"
                  name="course_id"
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  {coursesAvailable.map((course, index) => (
                    <SelectItem key={index} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </Select>
              </FormControl>
              <FormMessage className="font-bold text-red-500">
                Selecciona un curso para continuar.
              </FormMessage>
            </FormItem>
          </form>
        </div>
      </div>

      {/* Tabla de datos */}
      {isLoading ? (
        <Spinner color="primary" variant="grow" />
      ) : (
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              {data._header.map((header, index) => (
                <TableCell key={index}>{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {finalData.length
              ? finalData.map((client, index) => (
                  <TableRow key={index}>
                    <TableCell>{client.first_name}</TableCell>
                    <TableCell>{client.last_name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.whatsapp}</TableCell>
                    <TableCell>{client.country}</TableCell>
                    <TableCell>{client.city}</TableCell>
                    <TableCell>{client.course_name}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      )}
    </FormProvider>
  );
};

export default LeadsImportTable;
