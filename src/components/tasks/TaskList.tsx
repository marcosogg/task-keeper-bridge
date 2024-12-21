// src/components/tasks/TaskList.tsx
import { Clock, AlertTriangle, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTasks } from "@/hooks/queries/useTasks";
import { toast } from "sonner";
import { format } from "date-fns";
import { useState } from "react";
import { ViewTaskModal } from "./ViewTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskDialog } from "./details/DeleteTaskDialog";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/types/task";

export const TaskList = () => {
  const { data: tasks, isLoading, error } = useTasks();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

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

  const taskList = (
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
             <Badge variant="outline" className={cn("capitalize",
                  task.status === "todo" ? "bg-gray-100 text-gray-600" :
                  task.status === "in_progress" ? "bg-yellow-100 text-yellow-600" :
                  task.status === "completed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600",
                )}>
                 {task.status === "todo" ? "To Do" :
                task.status === "in_progress" ? "In Progress" :
                task.status === "completed" ? "Completed" : "Cancelled"}
            </Badge>
            <div className="flex items-center gap-1">
              <Button 
                size="icon" 
                variant="ghost"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditTaskId(task.id);
                }}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit task</span>
              </Button>
              <Button 
                size="icon" 
                variant="ghost"
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteTaskId(task.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSelectedTaskId(task.id)}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {taskList}
      {selectedTaskId && (
        <ViewTaskModal
          open={!!selectedTaskId}
          onOpenChange={(open) => !open && setSelectedTaskId(null)}
          taskId={selectedTaskId}
        />
      )}
      {editTaskId && (
        <EditTaskModal
          open={!!editTaskId}
          onOpenChange={(open) => !open && setEditTaskId(null)}
          task={tasks?.find(t => t.id === editTaskId)}
        />
      )}
      {deleteTaskId && (
        <DeleteTaskDialog
          open={!!deleteTaskId}
          onOpenChange={(open) => !open && setDeleteTaskId(null)}
          taskId={deleteTaskId}
        />
      )}
    </>
  );
};
  