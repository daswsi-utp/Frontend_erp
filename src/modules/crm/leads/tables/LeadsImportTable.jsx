import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  Switch,
  Tooltip,
} from "@/components/ui"; 
import GeneralTooltip from "@/components/shared/generalTooltip";
import { useCrud } from "@/hooks/useCrud";
import {
  capitalize,
  lettersOnly,
  regionNames,
} from "@/lib/auxiliarFunctions"
import lookup from "country-code-lookup";

const LeadsImportTable  = (props) => {
  const { data, coursesAvailable } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [finalData, setFinalData] = useState([]);
  const [selected, setSelected] = useState("");
  const [validated, setValidated] = useState(false);
  const [qualityLead, setQualityLead] = useState(false);
  const { insertModel: insertLeads } = useCrud("");

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
    const finalDataPost = {
      data: finalData,
    };
    await insertLeads(
      finalDataPost,
      "/api/v1/marketing/leads/insert_leads",
      layoutCallback
    );
    // console.log(finalDataPost)
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
        code:
          lookup.byCountry(_client.country) &&
          lookup.byCountry(_client.country).iso2,
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
    <>
      <Row>
        <Col xs>
          <Button
            size="small"
            color="success"
            className="ms-3"
            onClick={(e) => middlewareInsertLeads(e)}
          >
            Insertar los datos procesados{" "}
            <CIcon icon={cilSave} className="ms-1" />
          </Button>
          <Tooltip content="Marca esta casilla si estos leads son de calidad.">
            <Switch
              size="large"
              id="qualityLead"
              label="Lead de calidad?"
              className="ms-3 float-end"
              checked={qualityLead}
              onChange={() => setQualityLead(!qualityLead)}
            />
          </Tooltip>
        </Col>
        <Col xs>
          <form
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={middlewareInsertLeads}
          >
            <Select
              size="small"
              className="mb-3"
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Debes escoger un curso o en su defecto escoger la opcion Sin Asignar."
              id="validationCustom04"
              name="course_id"
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opcion</option>
              {coursesAvailable.map((course, index) => (
                <option key={index} value={course.id}>
                  {course.name}
                </option>
              ))}
            </Select>
          </form>
        </Col>
      </Row>

      {isLoading ? (
        <Spinner color="primary" variant="grow" />
      ) : (
        <Table className="mt-4" hover responsive>
          <TableHead>
            <TableRow>
              {data._header.map(
                (header, index) =>
                  index < data._header.length - 1 && (
                    <TableCell key={index} scope="col">
                      {header.label}
                    </TableCell>
                  )
              )}
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
    </>
  )
}

export default LeadsImportTable
