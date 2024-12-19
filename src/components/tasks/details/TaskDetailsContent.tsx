import { CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface TaskDetailsContentProps {
  description?: string | null;
  dueDate?: string | null;
  assignedToName?: string | null;
}

export const TaskDetailsContent = ({ 
  description, 
  dueDate, 
  assignedToName 
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
    </CardContent>
  );
};