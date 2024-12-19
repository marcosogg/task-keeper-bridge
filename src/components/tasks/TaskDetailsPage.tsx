import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TaskDetailsHeader } from "./details/TaskDetailsHeader";
import { TaskDetailsContent } from "./details/TaskDetailsContent";
import { TaskDetailsError } from "./details/TaskDetailsError";
import { TaskDetailsSkeleton } from "./details/TaskDetailsSkeleton";
import { MainContent } from "../MainContent";
import { useState } from "react";
import { EditTaskModal } from "./EditTaskModal";
import type { Task } from "@/types/task";

export const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: task, isLoading, error } = useQuery({
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

      if (error) throw error;
      if (!data) throw new Error('Task not found');
      
      // Ensure the status is one of the allowed values
      const validStatus = ['todo', 'in_progress', 'completed', 'cancelled'].includes(data.status)
        ? (data.status as Task['status'])
        : 'todo';

      return {
        ...data,
        status: validStatus
      } as Task;
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      if (!taskId) throw new Error('Task ID is required');
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Task deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate('/tasks');
    },
    onError: (error) => {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    },
  });

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTaskMutation.mutate();
    setIsDeleteDialogOpen(false);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  if (error) {
    return (
      <MainContent>
        <div className="p-6">
          <Card>
            <TaskDetailsError />
          </Card>
        </div>
      </MainContent>
    );
  }

  if (isLoading) {
    return (
      <MainContent>
        <div className="p-6">
          <Card>
            <TaskDetailsSkeleton />
          </Card>
        </div>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <div className="p-6">
        <Card className="max-w-4xl mx-auto">
          <TaskDetailsHeader 
            title={task.title}
            priority={task.priority}
            status={task.status}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <TaskDetailsContent 
            description={task.description}
            dueDate={task.due_date}
            assignedToName={task.assigned_to_profile?.full_name}
          />
        </Card>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteTaskMutation.isPending}
            >
              {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {task && (
        <EditTaskModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          task={task}
        />
      )}
    </MainContent>
  );
};