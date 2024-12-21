// src/components/tasks/details/TaskDetailsContent.tsx
import { CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import type { Task } from "@/types/task";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getPriorityColor } from "@/utils/styles";

interface TaskDetailsContentProps {
  description?: string | null;
  dueDate?: string | null;
  assignedToName?: string | null;
    task?: Task
}

export const TaskDetailsContent = ({ 
  description, 
  dueDate, 
  assignedToName,
    task
}: TaskDetailsContentProps) => {

  return (
    <CardContent className="space-y-6">
      {description && (
        <div className="space-y-2">
          <h3 className="font-medium">Description</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium">Due Date</h3>
          <p className="text-muted-foreground">
            {dueDate ? format(new Date(dueDate), 'PPP') : 'No due date'}
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Assigned To</h3>
          <p className="text-muted-foreground">
            {assignedToName || 'Unassigned'}
          </p>
        </div>
      </div>
        {task &&
        <Badge variant="outline" className={cn("capitalize",
            task.status === "todo" ? "bg-gray-100 text-gray-600" :
            task.status === "in_progress" ? "bg-yellow-100 text-yellow-600" :
            task.status === "completed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600",
        )}>
            {task.status === "todo" ? "To Do" :
            task.status === "in_progress" ? "In Progress" :
            task.status === "completed" ? "Completed" : "Cancelled"}
        </Badge>
        }
    </CardContent>
  );
};
