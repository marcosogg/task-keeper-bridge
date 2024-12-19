import { Clock, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTasks } from "@/hooks/queries/useTasks";
import { toast } from "sonner";
import { format } from "date-fns";

export const TaskList = () => {
  const { data: tasks, isLoading, error } = useTasks();

  if (error) {
    toast.error("Failed to load tasks");
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
        <p>There was an error loading the tasks. Please try again later.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4" role="list" aria-label="Loading tasks">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks found. Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" role="list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          role="listitem"
        >
          <div className="flex items-center space-x-4">
            {task.priority === "high" ? (
              <AlertTriangle className="h-5 w-5 text-red-500" aria-label="High priority" />
            ) : task.priority === "medium" ? (
              <Clock className="h-5 w-5 text-yellow-500" aria-label="Medium priority" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-500" aria-label="Low priority" />
            )}
            <div>
              <p className="font-medium text-gray-900">{task.title}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Due: {task.due_date ? format(new Date(task.due_date), 'MMM dd, yyyy') : 'No due date'}</span>
                <span>•</span>
                <span>Assigned to: {task.assigned_to_profile?.full_name || 'Unassigned'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary">
              {task.status === "todo" ? "To Do" : 
               task.status === "in_progress" ? "In Progress" : 
               "Completed"}
            </div>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};