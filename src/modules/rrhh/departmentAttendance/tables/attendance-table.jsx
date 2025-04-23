"use client"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { SquarePen } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const AttendanceTable = ({ data, setSelectedEmployee, setOpenEdit }) => {

    return (
        <div className="relative w-full max-w-[100vw] overflow-hidden">
            <ScrollArea className="w-full">
                <div className="min-w-max w-full">
                    <Table >
                        <TableHeader className="bg-gray-200 dark:bg-gray-900">
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>23-04-2025</TableHead>
                                <TableHead>24-04-2025</TableHead>
                                <TableHead>25-04-2025</TableHead>
                                <TableHead>Opciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((employee)=>(
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.id}</TableCell>
                                    <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                                    <TableCell>A</TableCell>
                                    <TableCell>J</TableCell>
                                    <TableCell>F</TableCell>
                                    <TableCell className="w-32">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="link" onClick={() => {
                                                        setSelectedEmployee(employee);
                                                        setOpenEdit(true);
                                                    }}><SquarePen size={16}/></Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Editar Asistencia</p>
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
  
export default AttendanceTable;