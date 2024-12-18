import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, FileText, ListCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TaskCreationForm } from "./tasks/TaskCreationForm";
import { EventCreationForm } from "./events/EventCreationForm";
import { NoteCreationForm } from "./notes/NoteCreationForm";

interface CreateTazqModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateTazqModal = ({ open, onOpenChange }: CreateTazqModalProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleOptionSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleClose = () => {
    setSelectedType(null);
    onOpenChange(false);
  };

  if (selectedType === "task") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Create New Task</DialogTitle>
          </DialogHeader>
          <TaskCreationForm onCancel={handleClose} onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    );
  }

  if (selectedType === "event") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Schedule New Event</DialogTitle>
          </DialogHeader>
          <EventCreationForm onCancel={handleClose} onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    );
  }

  if (selectedType === "note") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Create New Note</DialogTitle>
          </DialogHeader>
          <NoteCreationForm onCancel={handleClose} onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Create New TAZQ</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <Button
            variant="outline"
            className="flex items-center justify-start gap-3 h-16 px-4 hover:bg-primary/5 hover:border-primary transition-colors"
            onClick={() => handleOptionSelect("task")}
          >
            <ListCheck className="h-5 w-5 text-primary" />
            <div className="text-left">
              <div className="font-medium">Task</div>
              <div className="text-sm text-muted-foreground">Create a new task for your family</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center justify-start gap-3 h-16 px-4 hover:bg-primary/5 hover:border-primary transition-colors"
            onClick={() => handleOptionSelect("event")}
          >
            <Calendar className="h-5 w-5 text-primary" />
            <div className="text-left">
              <div className="font-medium">Event</div>
              <div className="text-sm text-muted-foreground">Schedule a new family event</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center justify-start gap-3 h-16 px-4 hover:bg-primary/5 hover:border-primary transition-colors"
            onClick={() => handleOptionSelect("note")}
          >
            <FileText className="h-5 w-5 text-primary" />
            <div className="text-left">
              <div className="font-medium">Note</div>
              <div className="text-sm text-muted-foreground">Add a new family note</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};