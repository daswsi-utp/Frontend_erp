"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Clock, XCircle, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const OrdenesProduccionTable = ({
  data,
  setSelectedOrden,
  setOpenFacturar,
  setOpenView
}) => {
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
      <ScrollArea className="w-full">
        <div className="min-w-max w-full">
          <Table>
            <TableHeader className="bg-gray-200 dark:bg-gray-900">
              <TableRow>
                <TableHead className="w-[100px]">ID de Orden</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((orden) => (
                <TableRow key={orden.id}>
                  <TableCell className="font-medium">OP-{orden.id.toString().padStart(4, '0')}</TableCell>
                  <TableCell>{orden.cliente}</TableCell>
                  <TableCell>{formatDate(orden.fecha)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {orden.estado === "Finalizada" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {orden.estado === "En proceso" && <Clock className="h-4 w-4 text-yellow-500" />}
                      {orden.estado === "Cancelada" && <XCircle className="h-4 w-4 text-red-500" />}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        orden.estado === "Finalizada" ? "bg-green-100 text-green-800" :
                        orden.estado === "En proceso" ? "bg-yellow-100 text-yellow-800" :
                        orden.estado === "Cancelada" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {orden.estado}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedOrden(orden);
                                setOpenFacturar(true);
                              }}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Facturar orden</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedOrden(orden);
                                setOpenView(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Vista previa</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default OrdenesProduccionTable;