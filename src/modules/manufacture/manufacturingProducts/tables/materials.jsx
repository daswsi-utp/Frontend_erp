"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MaterialsTable = ({ data, setSelectedMaterial, setOpenEdit, setOpenDelete }) => {
  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
      <ScrollArea className="w-full">
        <div className="min-w-max w-full">
          <Table>
            <TableHeader className="bg-gray-200 dark:bg-gray-900">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Unidades</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Opciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>{material.id}</TableCell>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.category}</TableCell>
                  <TableCell>{material.unit}</TableCell>
                  <TableCell>{material.code}</TableCell>
                  <TableCell>{material.state}</TableCell>
                  <TableCell className="w-32">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="link"
                            onClick={() => {
                              setSelectedMaterial(material);
                              setOpenEdit(true);
                            }}
                          >
                            <SquarePen size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar material</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              setSelectedMaterial(material);
                              setOpenDelete(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Eliminar material</p>
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

export default MaterialsTable;