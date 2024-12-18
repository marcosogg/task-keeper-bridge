import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Task } from "@/types/task";
import { cn } from "@/lib/utils";
import { getPriorityColor } from "@/utils/styles";

interface TaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | undefined;
  tasks: Task[];
}

export const TaskDialog = ({ isOpen, onOpenChange, selectedDate, tasks }: TaskDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Tasks for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {tasks.map(task => (
            <div 
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg border"
            >
              <div 
                className={cn(
                  "w-3 h-3 rounded-full",
                  getPriorityColor(task.priority)
                )}
              />
              <span>{task.title}</span>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              No tasks scheduled for this day
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};