import React, { useState } from 'react'
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/shared/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { IconHandClick, IconHistory, IconReplaceFilled } from '@tabler/icons-react'

import useCrud from '@/hooks/useCrud'
import { getArrivalMean, getBadgeClientState } from '@/lib/auxiliarFunctions'
import Modal from '@/components/shared/modal'
import ModalHistoryLead from '../modals/ModalHistoryLead'
import ModalReassignLead from '../modals/ModalReassignLead'

const columns = [
  { key: 'full_name', label: 'Cliente' },
  { key: 'country', label: 'País' },
  { key: 'phone', label: 'Teléfono' },
  { key: 'comercial', label: 'Asesor Encargado' },
  { key: 'arrival_mean', label: 'Procedencia' },
  { key: 'product', label: 'producto' },
  { key: 'client_state', label: 'Estado' },
  { key: 'actions', label: 'Acciones' },
]

const ResultsTable = ({ leads }) => {
  const { getModel: getHistoryLead } = useCrud("")
  const currentUser = JSON.parse(localStorage.getItem('current_user')) || { id: null }
  
  const [dataHistory, setDataHistory] = useState({})
  const [showModalHistory, setShowModalHistory] = useState(false)
  const [showModalReassign, setShowModalReassign] = useState(false)
  const [currentClient, setCurrentClient] = useState(null)

  const handleOpenReassignModal = (lead) => {
    setShowModalReassign(true)
    setCurrentClient(lead)
  }

  // const handleOpenHistoryModal = async (item) => {
  //   const { data } = await getHistoryLead(`/api/v1/coordinator/searchs/${item.phone}/history`)
  //   setDataHistory(data)
  //   setShowModalHistory(true)
  // }

  const handleOpenHistoryModal = async (item) => {
    try {
      const mockHistoryData = {
        calls: [
          {
            date_call: "2023-05-15 10:30",
            notes: "Cliente interesado en el curso avanzado",
            comercial_new: "Ana López"
          }
        ],
        full_name: item.full_name,
        product: item.product_name
      };

      setDataHistory([mockHistoryData]);
      setShowModalHistory(true);
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.full_name}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-2xl">
                        {item.country_code && (
                          <span className={`fi fi-${item.country_code.toLowerCase()}`} />
                        )}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{item.country}</TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.comercial}</TableCell>
                <TableCell>{getArrivalMean(item.arrival_mean)}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline">
                        {item.product_code}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      {`${item.product_name} (${item.product_status === 'inactive' ? 'producto Inactivo' : 'producto Activo'})`}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Badge variant={getBadgeClientState(item.client_state)?.variant || "default"}>
                    {getBadgeClientState(item.client_state)?.text || "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleOpenHistoryModal(item)}
                      >
                        <IconHistory className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ver historial completo</TooltipContent>
                  </Tooltip>

                  {currentUser.id === item.user_id && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          asChild
                        >
                          <Link to={`/supervision/leads/${item.id}/seguimiento`}>
                            <IconHandClick className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Dar seguimiento</TooltipContent>
                    </Tooltip>
                  )}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleOpenReassignModal(item)}
                      >
                        <IconReplaceFilled className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reasignar Lead</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ModalHistoryLead
        open={showModalHistory}
        setOpen={setShowModalHistory}
        data={dataHistory}
        setDataHistory={setDataHistory}
      />

      <ModalReassignLead
        open={showModalReassign}
        setOpen={setShowModalReassign}
        lead={currentClient}
        setLead={setCurrentClient}
      />
    </>
  )
}

export default ResultsTable