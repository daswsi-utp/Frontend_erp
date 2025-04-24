"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
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
  setOpenEdit,
  setOpenDelete
}) => {
  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
      <ScrollArea className="w-full">
        <div className="min-w-max w-full">
          <Table>
            <TableHeader className="bg-gray-200 dark:bg-gray-900">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Inicio</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Opciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((orden) => (
                <TableRow key={orden.id}>
                  <TableCell>{orden.id}</TableCell>
                  <TableCell>{orden.nombreProducto}</TableCell>
                  <TableCell>{orden.cantidad}</TableCell>
                  <TableCell>{orden.fechaInicio}</TableCell>
                  <TableCell>{orden.fechaFin}</TableCell>
                  <TableCell>{orden.responsable}</TableCell>

                  {/*<TableCell>{orden.estado}</TableCell>*/}
                  {/*<TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        orden.estado === "Finalizada"
                          ? "bg-green-100 text-green-800"
                          : orden.estado === "En proceso"
                          ? "bg-yellow-100 text-yellow-800"
                          : orden.estado === "Cancelada"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {orden.estado}
                    </span>
                  </TableCell>*/}

                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {/* Icono según el estado */}
                      {orden.estado === "Finalizada" && <CheckCircle className="text-green-500" />}
                      {orden.estado === "En proceso" && <Clock className="text-yellow-500" />}
                      {orden.estado === "Cancelada" && <XCircle className="text-red-500" />}

                      {/* Texto con el estado y color */}
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          orden.estado === "Finalizada"
                            ? "bg-green-100 text-green-800"
                            : orden.estado === "En proceso"
                            ? "bg-yellow-100 text-yellow-800"
                            : orden.estado === "Cancelada"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {orden.estado}
                      </span>
                    </div>
                  </TableCell>




                  <TableCell className="w-32">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="link"
                            onClick={() => {
                              setSelectedOrden(orden);
                              setOpenEdit(true);
                            }}
                          >
                            <SquarePen size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar orden</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              setSelectedOrden(orden);
                              setOpenDelete(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Eliminar orden</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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