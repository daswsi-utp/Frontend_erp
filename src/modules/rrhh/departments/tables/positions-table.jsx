"use client"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen, BookUser } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const PositionsTable = ({ data, setSelectedPosition, setOpenEdit, setOpenDelete }) => {

    return (
        <div className="relative w-full max-w-[100vw] overflow-hidden">
            <ScrollArea className="w-full">
                <div className="min-w-max w-full">
                    <Table >
                        <TableHeader className="bg-gray-200 dark:bg-gray-900">
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Descripcion</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Opciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((position)=>(
                                <TableRow key={position.id}>
                                    <TableCell>{position.id}</TableCell>
                                    <TableCell>{position.name}</TableCell>
                                    <TableCell>{position.description}</TableCell>
                                    <TableCell>{position.state}</TableCell>
                                    <TableCell className="w-32">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="link" onClick={() => {
                                                        setSelectedPosition(position);
                                                        setOpenEdit(true);
                                                    }}><SquarePen size={16}/></Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Editar Cargo</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="destructive" onClick={() => {
                                                        setSelectedPosition(position);
                                                        setOpenDelete(true);
                                                    }}><Trash2 size={16}/></Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Eliminar Cargo</p>
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
  
export default PositionsTable;