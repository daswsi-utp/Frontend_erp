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
import { Trash2, SquarePen, Boxes } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const FinishedProductsTable = ({ data, setSelectedProduct, setOpenEdit, setOpenDelete }) => {
  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
      <ScrollArea className="w-full">
        <div className="min-w-max w-full">
          <Table>
            <TableHeader className="bg-gray-200 dark:bg-gray-900">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre del Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Opciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.state}</TableCell>
                  <TableCell className="w-32">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="link"
                            onClick={() => {
                              setSelectedProduct(product);
                              setOpenEdit(true);
                            }}
                          >
                            <SquarePen size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar Producto</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              setSelectedProduct(product);
                              setOpenDelete(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Eliminar Producto</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={`/materialList/${encodeURIComponent(product.code)}`}>
                            <Boxes size={16} className="mx-3" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ver materiales</p>
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

export default FinishedProductsTable;