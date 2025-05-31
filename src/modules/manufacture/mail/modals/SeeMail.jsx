"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import TiptapEditor from "@/components/tiptap";


const SeeMail=({open, onOpenChange, mail, onMailChange})=> {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo Empleado</Button>
      </DialogTrigger>
        <DialogContent className="max-w-xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Correo</DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="h-[50vh] pr-2">
            <label className="text-sm font-medium">Para:</label>
            <Input value={mail.to.join(" - ")} />
            <label className="text-sm font-medium">Asunto</label>
            <Input value={mail.subject} />
            <label className="text-sm font-medium">Cuerpo del correo</label>
            <TiptapEditor value={mail.body} />
          </ScrollArea>

        </DialogContent>
    </Dialog>
  );
}
export default SeeMail;