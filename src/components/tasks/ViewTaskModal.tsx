// src/components/tasks/ViewTaskModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TaskDetailsContent } from "./details/TaskDetailsContent";
import { TaskDetailsError } from "./details/TaskDetailsError";
import { TaskDetailsSkeleton } from "./details/TaskDetailsSkeleton";
import type { Task } from "@/types/task";
import { TaskDetailsHeader } from "./details/TaskDetailsHeader";
import { useState } from "react";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskDialog } from "./details/DeleteTaskDialog";
import { useTaskMutations } from "@/hooks/useTaskMutations";

interface ViewTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
}

export const ViewTaskModal = ({
  open,
  onOpenChange,
  taskId,
}: ViewTaskModalProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const { invalidateTaskQueries } = useTaskMutations();

   const { data: task, isLoading, error } = useQuery(
       {
        queryKey: ['task', taskId],
        queryFn: async () => {
          if (!taskId) throw new Error('Task ID is required');

          const { data, error } = await supabase
            .from('tasks')
            .select(`
              *,
              assigned_to_profile:profiles!tasks_assigned_to_fkey(
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
          
          // Ensure the status is one of the allowed values
          const validStatus = ['todo', 'in_progress', 'completed', 'cancelled'].includes(data.status)
            ? (data.status as Task['status'])
            : 'todo';
          
          // Transform the data to match our Task type
          return {
            ...data,
            assigned_to: data.assigned_to ? (Array.isArray(data.assigned_to) ? data.assigned_to : [data.assigned_to]) : null,
            assigned_to_profile: data.assigned_to_profile ? (Array.isArray(data.assigned_to_profile) ? data.assigned_to_profile : [data.assigned_to_profile]) : [],
            status: validStatus
          } as Task;
        },
        enabled: !!taskId,
        retry: 1,
        onSuccess: () => {
            invalidateTaskQueries(taskId);
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
         }
       } as UseQueryOptions<Task, Error, Task, string[]>
  );

  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>Task Details Error</DialogTitle>
            </DialogHeader>
        <TaskDetailsError />
       </DialogContent>
      </Dialog>
    );
  }

  if (isLoading || !task) {
     return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>Loading Task Details</DialogTitle>
            </DialogHeader>
          <TaskDetailsSkeleton />
        </DialogContent>
      </Dialog>
     );
   }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl">
             <DialogHeader>
                 <DialogTitle>Task Details</DialogTitle>
             </DialogHeader>
           <TaskDetailsHeader 
                title={task.title}
                priority={task.priority}
              status={task.status}
              onEdit={() => setIsEditModalOpen(true)}
                onDelete={() => setIsDeleteDialogOpen(true)}
              />
          <TaskDetailsContent
              description={task.description}
              dueDate={task.due_date}
              assignedToName={task.assigned_to_profile?.[0]?.full_name}
              task={task}
           />
          </DialogContent>
        <DeleteTaskDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          taskId={task.id}
        />
        <EditTaskModal
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
          task={task}
        />
      </Dialog>
  );
};
