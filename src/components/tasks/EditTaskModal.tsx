import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TaskCreationForm } from "./TaskCreationForm";
import type { Task } from "@/types/task";

interface EditTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
}

export const EditTaskModal = ({ open, onOpenChange, task }: EditTaskModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Edit Task</DialogTitle>
        </DialogHeader>
        <TaskCreationForm 
          onCancel={() => onOpenChange(false)} 
          onSuccess={() => onOpenChange(false)}
          editMode={true}
          initialData={task}
        />
      </DialogContent>
    </Dialog>
  );
};