"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import TiptapEditor from "@/components/tiptapsee";


const SeeMail=({open, onOpenChange, mail, onMailChange})=> {
  if (!mail) return null;

  return (
    <div className="relative h-full max-h-screen overflow-hidden">
      <Dialog open={open} onOpenChange={onOpenChange} className="max-h-[60vh]">
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
            <TiptapEditor content={mail.body} />
          </ScrollArea>

        </DialogContent>
      </Dialog>
    </div>
  );
}
export default SeeMail;