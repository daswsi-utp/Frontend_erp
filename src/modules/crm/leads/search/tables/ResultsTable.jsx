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
  { key: 'memberName', label: 'Asesor Encargado' },
  { key: 'arrivalMeanName', label: 'Procedencia' },
  { key: 'productName', label: 'Producto' },
  { key: 'clientStateName', label: 'Estado' },
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
        product: item.productName
      };

      setDataHistory([mockHistoryData]);
      setShowModalHistory(true);
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  return (
    <>
      <div className="overflow-auto rounded-md border">
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
                <TableCell>{`${item.firstName || ''} ${item.lastName || ''}`.trim()}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-2xl">
                        {item.countryCode && (
                          <span className={`fi fi-${item.countryCode.toLowerCase()}`} />
                        )}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{item.country}</TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.memberName}</TableCell>
                <TableCell>{getArrivalMean(item.arrivalMeanName)}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline">
                        {item.productCode || 'N/A'}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      {item.productName || 'Producto desconocido'}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Badge variant={getBadgeClientState(item.clientStateName)?.variant || "default"}>
                    {getBadgeClientState(item.clientStateName)?.text || item.clientStateName || "Desconocido"}
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

                  {currentUser.id === item.memberId && (
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
