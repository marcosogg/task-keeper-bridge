import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getPriorityColor } from "@/utils/styles";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/common";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EditTaskModal } from "@/components/tasks/EditTaskModal";
import { DeleteTaskDialog } from "@/components/tasks/DeleteTaskDialog";

interface ViewTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
}

export const ViewTaskModal = ({ open, onOpenChange, taskId }: ViewTaskModalProps) => {
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      if (!taskId) throw new Error('Task ID is required');

      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          assigned_to_profile:profiles!tasks_assigned_to_fkey (
            full_name,
            email,
            avatar_url
          )
        `)
        .eq('id', taskId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching task:', error);
        throw error;
      }
      if (!data) throw new Error('Task not found');
      
      const validStatus = ['todo', 'in_progress', 'completed', 'cancelled'].includes(data.status)
        ? (data.status as Task['status'])
        : 'todo';

      return {
        ...data,
        status: validStatus
      } as Task;
    },
    enabled: !!taskId,
    retry: 1,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (isLoading || !task) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading...</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{task.title}</span>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline"
                className={cn(
                  "capitalize",
                  getPriorityColor(task.priority)
                )}
              >
                {task.priority}
              </Badge>
              <Badge 
                variant="outline"
                className="capitalize"
              >
                {task.status.replace('_', ' ')}
              </Badge>
              <div className="flex items-center gap-1 ml-2">
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit task</span>
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {task.description && (
            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{task.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Due Date</h3>
              <p className="text-muted-foreground">
                {task.due_date ? format(new Date(task.due_date), 'PPP') : 'No due date'}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Assigned To</h3>
              <p className="text-muted-foreground">
                {task.assigned_to_profile?.full_name || 'Unassigned'}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
      {isEditModalOpen && (
        <EditTaskModal
          open={isEditModalOpen}
          onOpenChange={(open) => {
            setIsEditModalOpen(open);
            if (!open) onOpenChange(false);
          }}
          task={task}
        />
      )}
      {isDeleteDialogOpen && (
        <DeleteTaskDialog
          open={isDeleteDialogOpen}
          onOpenChange={(open) => {
            setIsDeleteDialogOpen(open);
            if (!open) onOpenChange(false);
          }}
          taskId={taskId}
        />
      )}
    </Dialog>
  );
};
