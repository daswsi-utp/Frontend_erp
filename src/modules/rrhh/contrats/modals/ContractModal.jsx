"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const ShowContractModal = ({ open, onOpenChange, contract, onContractChange  }) =>{
  if (!contract) return null;

  return (
    <div className="relative h-full max-h-screen overflow-hidden">
      <Dialog open={open} onOpenChange={onOpenChange} className="max-h-[60vh]">
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Contrato del Empleado</DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="h-[70vh] pr-2">
            <div className="w-full h-[80vh]">
                {contract?.key ? (
                  <iframe
                    src={contract.key}
                    className="w-full h-full"
                    frameBorder="0"
                  />
                  ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No se encontró ningún contrato para este empleado.
                  </div>
                )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ShowContractModal;