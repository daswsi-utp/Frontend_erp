"use client"
import { useState, useMemo } from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { ScanEye, SquarePen, Search } from 'lucide-react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const MailsTable = ({ data, setSelectedMail, setOpenSee }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEmails = useMemo(() => {
    if (!searchTerm) return data
    return data.filter(mail => {
      const matchesName =
        !searchTerm ||
        mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mail.to.some(email =>email.toLowerCase().includes(searchTerm));
  
      return matchesName;
    });
  }, [data, searchTerm])
  
  const columns = [
      { key: 'index', label: 'Codigo', className: 'w-10' },
      { key: 'subject', label: 'Asunto' },
      { key: 'to', label: 'Destinatarios' },
      { key: 'obtions', label: 'Opciones' }
  ];

  return (
      <div className="relative w-full max-w-[100vw] overflow-hidden">
        <ScrollArea className="w-full">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar mail por asunto o destinatarios"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="min-w-max w-full rounded-md border">
            <Table >
              <TableHeader className="bg-gray-200 dark:bg-gray-900">
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key} className={column.className}>
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
              {filteredEmails.length > 0 ? (
                filteredEmails.map((mail, index) => (
                  <TableRow key={index}>
                    <TableCell>{mail.id}</TableCell>
                    <TableCell>{mail.subject}</TableCell>
                    <TableCell>{mail.to.join(" - ")}</TableCell>
                    <TableCell className="w-32">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="link" onClick={() => {
                              setSelectedMail(mail);
                              setOpenSee(true);
                            }}><ScanEye size={16}/></Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver Correo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      </div>
  );
};
  
export default MailsTable;