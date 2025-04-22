import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FaCheckCircle } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";

import { 
  IconAd, 
  IconBrandFacebook, 
  IconBrandGoogle, 
  IconBrandInstagram, 
  IconBrandTiktok, 
  IconBrandWhatsapp, 
  IconFaceIdError, 
  IconRecycle 
} from '@tabler/icons-react';

const ClientStatesList = [
  { id: 1, name: "Nuevo Cliente", slug: "NC" },
  { id: 2, name: "Cliente Interesado", slug: "CI" },
  { id: 3, name: "Cliente Potencial", slug: "CP" },
  { id: 4, name: "Envio de Ficha", slug: "EF" },
  { id: 5, name: "Matrículado", slug: "M" },
  { id: 6, name: "No Interesado", slug: "NI" },
  { id: 7, name: "No Responde", slug: "NR" },
  { id: 8, name: "Numero Equivocado", slug: "NE" },
  { id: 9, name: "Reciclado", slug: "RC" },
  { id: 10, name: "Base Historica", slug: "BH" },
  { id: 11, name: "Separar Matricula", slug: "SM" }
];

const ArrivalMeanList = [
  { id: 1, name: "Sin Asignar", slug: "S/A" },
  { id: 2, name: "Facebook", slug: "FB" },
  { id: 3, name: "WhatsAPP", slug: "WSP" },
  { id: 4, name: "Instagram", slug: "IG" },
  { id: 5, name: "Goodle Ads", slug: "GA" },
  { id: 6, name: "TikTok", slug: "TTK" },
  { id: 7, name: "Base Historica", slug: "RC" }
];

export const uniqBy = (_arr, _key) => {
  let index = [];
  return _arr.filter((item) => {
    let k = _key(item);
    return index.indexOf(k) >= 0 ? false : index.push(k);
  });
};

export const capitalize = (word) => {
  if (word[0] === undefined) {
    return "";
  } else {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
};

export const lettersOnly = (str) => {
  return str.replace(/[^a-z A-Z]/g, "");
};

export const regionNames = new Intl.DisplayNames(['es'], { type: 'region' });

export const normalizeDate = (date) => {
  const aux = new Date(date);
  var numberOfMlSeconds = aux.getTime();
  var addMlSeconds = 60 * 60000 * 24;
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return newDateObj.toLocaleDateString('es-ES', options);
};

export const normalizeDateV2 = (date) => {
  const aux = new Date(date);
  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return aux.toLocaleDateString('es-ES', options);
};

export const normalizeDateWithHour = (date) => {
  const aux = new Date(date);
  var options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return aux.toLocaleDateString('es-ES', options);
};

export const normalizeDateOnlyDayMonth = (date) => {
  const aux = new Date(date);
  var options = { month: 'short', day: 'numeric' };
  return aux.toLocaleDateString('es-ES', options);
};

export const normalizeHour = () => {
  const aux = new Date();
  var options = { hour: '2-digit', minute: '2-digit' };
  return aux.toLocaleTimeString('default', options);
};

export const normalizeOnlyHour = (date) => {
  const aux = new Date(date);
  var options = { hour: '2-digit', minute: '2-digit' };
  return aux.toLocaleTimeString('default', options);
};

// UI Components with shadcn/ui
export const getBadge = (state) => {
  switch (state) {
    case "CI":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-it_button"> {state} </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cliente Interesado</p>
          </TooltipContent>
        </Tooltip>
      );
    case "NC":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="info"> {state} </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Nuevo Cliente</p>
          </TooltipContent>
        </Tooltip>
      );
    case "CP":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-cp_button"> {state} </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cliente Potencial</p>
          </TooltipContent>
        </Tooltip>
      );
    case "EF":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-ef_button"> {state} </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Envio de Ficha</p>
          </TooltipContent>
        </Tooltip>
      );
    case "M":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-m_button"> {state} </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cliente Matriculado</p>
          </TooltipContent>
        </Tooltip>
      );
    case "NI":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-ni_button"> {state} </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cliente NO Interesado</p>
          </TooltipContent>
        </Tooltip>
      );
    case "NR":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-nr_button"> {state} </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cliente No Responde las Llamadas</p>
          </TooltipContent>
        </Tooltip>
      );
    case "NE":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-ne_button"> {state} </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Número Equivocado</p>
          </TooltipContent>
        </Tooltip>
      );
    case "SM":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-ne_button"> {state} </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Separar Matrícula</p>
          </TooltipContent>
        </Tooltip>
      );
    default:
      return <Badge variant="info"> {state} </Badge>;
  }
};

export const getBadgeClientState = (state_id) => {
  const state = ClientStatesList.find((state) => state.id === state_id);
  if (state !== undefined) {
    switch (state.slug) {
      case "CI":
        return <Badge className="bg-it_button"> {state.name} </Badge>;
      case "CP":
        return <Badge className="bg-cp_button"> {state.name} </Badge>;
      case "EF":
        return <Badge className="bg-ef_button"> {state.name} </Badge>;
      case "M":
        return <Badge className="bg-m_button"> {state.name} </Badge>;
      case "NI":
        return <Badge className="bg-ni_button"> {state.name} </Badge>;
      case "NR":
        return <Badge className="bg-nr_button"> {state.name} </Badge>;
      case "NE":
        return <Badge className="bg-ne_button"> {state.name} </Badge>;
      case "BH":
        return <Badge className="bg-bh_button"> {state.name} </Badge>;
      case "SM":
        return <Badge className="bg-cp_button"> {state.name} </Badge>;
      default:
        return <Badge variant="info"> {state.name} </Badge>;
    }
  }
};

export const getBadgeUserStatus = (state) => {
  switch (state) {
    case "active":
      return <Badge variant="primary"> Activo, con acceso al Sistema </Badge>;
    case "inactive":
      return <Badge variant="destructive"> Inactivo, sin acceso al Sistema </Badge>;
    default:
      return <Badge variant="info"> {state} </Badge>;
  }
};

export const getDocument_type = (document_type) => {
  switch (document_type) {
    case "dni":
      return "DNI";
    case "passport":
      return "PASAPORTE";
    case "foreigner_card":
      return "CARNET DE EXTRANGERÍA";
    default:
      return "STD";
  }
};

export const getCargo = (role_id) => {
  switch (role_id) {
    case 1:
      return "root";
    case 2:
      return "Sin Asignar";
    case 3:
      return "Supervisor(a) de Ventas";
    case 4:
      return "Asesor(a) Comercial";
    case 5:
      return "Coordinador(a) de Ventas";
    case 6:
      return "Administrador(a)";
    case 7:
      return "Agente de Marketing";
  }
};

export const getMonthName = (date_year_month) => {
  const monnthNumber = date_year_month.split("-")[1];
  const monthName = new Date(2021, monnthNumber - 1, 1).toLocaleString('es-PE', { month: 'long' });
  return monthName;
};

export const getDayName = (full_date) => {
  let date = new Date(full_date.replace(/-+/g, '/'));
  return date.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric' });
};

export const getArrivalMeanName = (arrival_mean_id) => {
  const arrivalMean = ArrivalMeanList.find((arrival_mean) => arrival_mean.id === arrival_mean_id);
  if (arrivalMean === undefined) return "Sin asignar";
  return arrivalMean.name;
};

export const getComercialProcess = (_status) => {
  if (_status === 'comercial_no_specified') {
    return 'No aprobado, en espera de aprobación';
  } else if (_status === 'comercial_approved') {
    return 'Aprobado';
  } else if (_status === 'comercial_disapproved') {
    return 'No aprobado';
  } else {
    return 'Sin especificar';
  }
};

export const getBossProcess = (_status) => {
  if (_status === 'boss_no_specified') {
    return 'No aprobado, en espera de aprobación';
  } else if (_status === 'boss_approved') {
    return 'Aprobado, por administración';
  } else if (_status === 'boss_disapproved') {
    return 'No aprobado, por administración';
  } else {
    return 'Sin especificar';
  }
};

export const getShowClientStatus = (_status) => {
  if (_status === 'hidden') {
    return 'Oculto para el cliente, no puede editar ni ver';
  } else if (_status === 'show') {
    return 'Visible para el cliente, puede editar y ver';
  } else {
    return 'Sin especificar';
  }
};

export const getGender = (_gender) => {
  if (_gender === "male") {
    return 'Masculino';
  } else if (_gender === "female") {
    return 'Femenino';
  } else {
    return 'Sin especificar';
  }
};

export const getBadgeNotificationStatus = (state) => {
  switch (state) {
    case "unviewed":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="success"> Sin ver aún </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>El recordatorio no fue marcado como visto.</p>
          </TooltipContent>
        </Tooltip>
      );
    case "viewed":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="success"> Sin ver aún </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>El recordatorio fue marcado como visto.</p>
          </TooltipContent>
        </Tooltip>
      );
    default:
      return <Badge variant="info"> Error Data </Badge>;
  }
};

export const getBadgePersonalRecordAdminStatus = (state) => {
  switch (state) {
    case "boss_no_specified":
      return (
        <Tooltip>
          <TooltipTrigger>
            <FontAwesomeIcon icon={FaQuestionCircle} size="xl" style={{ color: "#000080" }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>La ficha no fue evaluada aun por el área administrativa.</p>
          </TooltipContent>
        </Tooltip>
      );
    case "boss_approved":
      return (
        <Tooltip>
          <TooltipTrigger>
            <FontAwesomeIcon icon={FaCheckCircle} size="xl" style={{ color: "#4BB543" }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>La ficha fue aprobada por el área administrativa y enviada al aula virtual.</p>
          </TooltipContent>
        </Tooltip>
      );
    case "boss_disapproved":
      return (
        <Tooltip>
          <TooltipTrigger>
            <FontAwesomeIcon icon={FaCircleXmark} size="xl" style={{ color: "#FF9494" }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>La ficha fue rechazada por el área administrativa.</p>
          </TooltipContent>
        </Tooltip>
      );
  }
};

export const getBadgePersonalRecordComercialStatus = (state) => {
  switch (state) {
    case "comercial_no_specified":
      return (
        <Tooltip>
          <TooltipTrigger>
            <FontAwesomeIcon icon={FaQuestionCircle} size="xl" style={{ color: "#000080" }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>La ficha no fue evaluada aun por el área comercial.</p>
          </TooltipContent>
        </Tooltip>
      );
    case "comercial_approved":
      return (
        <Tooltip>
          <TooltipTrigger>
            <FontAwesomeIcon icon={FaCheckCircle} size="xl" style={{ color: "#4BB543" }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>La ficha fue aprobada por el área comercial.</p>
          </TooltipContent>
        </Tooltip>
      );
    case "comercial_disapproved":
      return (
        <Tooltip>
          <TooltipTrigger>
            <FontAwesomeIcon icon={FaCheckCircle} size="xl" style={{ color: "#FF9494" }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>La ficha fue rechazada por el área comercial.</p>
          </TooltipContent>
        </Tooltip>
      );
  }
};

export const getStatusPaymentSchedule = (state) => {
  switch (state) {
    case "pending":
      return (
        <Tooltip>
          <TooltipTrigger>
            <FontAwesomeIcon icon={FaClock} size="xl" style={{ color: "#83d4e1" }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>La cuota esta pendiente.</p>
          </TooltipContent>
        </Tooltip>
      );
    case "paid":
      return (
        <Tooltip>
          <TooltipTrigger>
            <FontAwesomeIcon icon={FaCheckCircle} size="xl" style={{ color: "#52cd7b" }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>El pago de la cuota ya fue realizado.</p>
          </TooltipContent>
        </Tooltip>
      );
    default:
      return (
        <Tooltip>
          <TooltipTrigger>
            <FontAwesomeIcon icon={FaCircleXmark} size="xl" style={{ color: "#FF9494" }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>El pago se dio de baja, el alumno no continuo pagando.</p>
          </TooltipContent>
        </Tooltip>
      );
  }
};

export const ClientCurrencyBadge = ({ currency }) => {
  if (currency === "pen") {
    return (
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="info">SOLES</Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Precio en Nuevos Soles</p>
        </TooltipContent>
      </Tooltip>
    );
  } else if (currency === "dollar" || currency === "usd") {
    return (
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="info">DÓLARES</Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Precio en Dólares</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  return null;
};

export const getBadgeTypePaymentSchedule = (type) => {
 switch (type) {
   case "pre_inscription":
     return (
       <Tooltip>
         <TooltipTrigger>
           <Badge variant="info">Pre-Matrícula</Badge>
         </TooltipTrigger>
         <TooltipContent>
           <p>Cuota de pre-matrícula.</p>
         </TooltipContent>
       </Tooltip>
     );
   case "full_inscription":
     return (
       <Tooltip>
         <TooltipTrigger>
           <Badge variant="success">Matrícula Completa</Badge>
         </TooltipTrigger>
         <TooltipContent>
           <p>Cuota de Matrícula.</p>
         </TooltipContent>
       </Tooltip>
     );
   case "full_paid":
     return (
       <Tooltip>
         <TooltipTrigger>
           <Badge variant="success">Pago completo</Badge>
         </TooltipTrigger>
         <TooltipContent>
           <p>Cuota de pago completo, el cliente paga el curso completo.</p>
         </TooltipContent>
       </Tooltip>
     );
   case "standard":
     return (
       <Tooltip>
         <TooltipTrigger>
           <Badge variant="default">Pago estándar</Badge>
         </TooltipTrigger>
         <TooltipContent>
           <p>Cuota de pago estándar.</p>
         </TooltipContent>
       </Tooltip>
     );
   case "extended":
     return (
       <Tooltip>
         <TooltipTrigger>
           <Badge variant="destructive">Pago extendido</Badge>
         </TooltipTrigger>
         <TooltipContent>
           <p>Cuota de pago extendido.</p>
         </TooltipContent>
       </Tooltip>
     );
   default:
     return <Badge variant="info">Error Data</Badge>;
 }
};

export const getArrivalMean = (arrival_mean) => {
 switch (arrival_mean) {
   case 1:
     return (
       <Tooltip>
         <TooltipTrigger>
           <IconFaceIdError size={30} color='#000' stroke={2} />
         </TooltipTrigger>
         <TooltipContent>
           <p>Sin Asignar.</p>
         </TooltipContent>
       </Tooltip>
     );
   case 2:
     return (
       <Tooltip>
         <TooltipTrigger>
           <IconBrandFacebook size={30} color='#1877F2' stroke={2} />
         </TooltipTrigger>
         <TooltipContent>
           <p>Lead Ingresado desde facebook</p>
         </TooltipContent>
       </Tooltip>
     );
   case 3:
     return (
       <Tooltip>
         <TooltipTrigger>
           <IconBrandWhatsapp size={30} color='#25D366' stroke={2} />
         </TooltipTrigger>
         <TooltipContent>
           <p>Lead Ingresado desde WhatsAPP.</p>
         </TooltipContent>
       </Tooltip>
     );
   case 4:
     return (
       <Tooltip>
         <TooltipTrigger>
           <IconBrandInstagram size={30} color='#833AB4' stroke={2} />
         </TooltipTrigger>
         <TooltipContent>
           <p>Lead Ingresado desde Instagram.</p>
         </TooltipContent>
       </Tooltip>
     );
   case 5:
     return (
       <Tooltip>
         <TooltipTrigger>
           <IconBrandGoogle size={30} color='#DC4E41' stroke={2} />
         </TooltipTrigger>
         <TooltipContent>
           <p>Lead Ingresado desde Google Ads.</p>
         </TooltipContent>
       </Tooltip>
     );
   case 6:
     return (
       <Tooltip>
         <TooltipTrigger>
           <IconBrandTiktok size={30} color='#000000' stroke={2} />
         </TooltipTrigger>
         <TooltipContent>
           <p>Lead Ingresado desde Tik Tok.</p>
         </TooltipContent>
       </Tooltip>
     );
   case 7:
     return (
       <Tooltip>
         <TooltipTrigger>
           <IconRecycle size={30} color='green' stroke={2} />
         </TooltipTrigger>
         <TooltipContent>
           <p>Lead ingresado desde Base Histórica.</p>
         </TooltipContent>
       </Tooltip>
     );
   case 8:
     return (
       <Tooltip>
         <TooltipTrigger>
           <IconAd size={30} color='#000' stroke={2} />
         </TooltipTrigger>
         <TooltipContent>
           <p>Lead Ingresada desde la Landing Web.</p>
         </TooltipContent>
       </Tooltip>
     );
   default:
     return <Badge variant="info">Error Data</Badge>;
 }
};

export const getPayType = (pay_type) => {
 switch (pay_type) {
   case "financed":
     return (
       <Tooltip>
         <TooltipTrigger>
           <Badge variant="info">Financiado</Badge>
         </TooltipTrigger>
         <TooltipContent>
           <p>Pago Financiado</p>
         </TooltipContent>
       </Tooltip>
     );
   case "initialPay":
     return (
       <Tooltip>
         <TooltipTrigger>
           <Badge variant="info">Pre Matricula</Badge>
         </TooltipTrigger>
         <TooltipContent>
           <p>Pre Matricula Curso.</p>
         </TooltipContent>
       </Tooltip>
     );
   case "cash":
     return (
       <Tooltip>
         <TooltipTrigger>
           <Badge variant="success">Pago Completo del Curso</Badge>
         </TooltipTrigger>
         <TooltipContent>
           <p>Pago Completo del Curso.</p>
         </TooltipContent>
       </Tooltip>
     );
   default:
     return <Badge variant="info">Error Data</Badge>;
 }
};

export const getStatusInstallment = (status) => {
 switch (status) {
   case "paid":
     return (
       <Tooltip>
         <TooltipTrigger>
           <Badge variant="success">Pagado</Badge>
         </TooltipTrigger>
         <TooltipContent>
           <p>Cuota Pagada.</p>
         </TooltipContent>
       </Tooltip>
     );
   case "unpaid":
     return (
       <Tooltip>
         <TooltipTrigger>
           <Badge variant="destructive">NO Pagado</Badge>
         </TooltipTrigger>
         <TooltipContent>
           <p>Cuota sin Pago registrado.</p>
         </TooltipContent>
       </Tooltip>
     );
   default:
     return <Badge variant="info">Error Data</Badge>;
 }
};

export const CurrencyBadge = ({ currency }) => {
 if (currency === "pen") {
   return (
     <Tooltip>
       <TooltipTrigger>
         <Badge variant="info">SOLES</Badge>
       </TooltipTrigger>
       <TooltipContent>
         <p>Pago en Soles</p>
       </TooltipContent>
     </Tooltip>
   );
 } else if (currency === "dollar" || currency === "usd") {
   return (
     <Tooltip>
       <TooltipTrigger>
         <Badge variant="info">DÓLARES</Badge>
       </TooltipTrigger>
       <TooltipContent>
         <p>Pago en Dólares</p>
       </TooltipContent>
     </Tooltip>
   );
 }
 return null;
};

export const getCurrencyClient = (currency) => {
 if (currency === "pen") {
   return "SOLES";
 } else if (currency === "dollar" || currency === "usd") {
   return "DÓLARES";
 }
 return "";
};

export const getBadgeStatusPermission = (status) => {
 const statusTable = {
   pending: <Badge variant="warning">Pendiente</Badge>,
   approved: <Badge variant="success">Aprobado</Badge>,
   unapproved: <Badge variant="destructive">Rechazado</Badge>
 };

 return statusTable[status] || <Badge variant="secondary">Desconocido</Badge>;
};