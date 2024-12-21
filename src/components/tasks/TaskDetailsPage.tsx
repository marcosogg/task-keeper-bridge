// src/components/tasks/details/TaskDetailsContainer.tsx
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MainContent } from "@/components/MainContent";
import { useState } from "react";
import { TaskDetailsHeader } from "./details/TaskDetailsHeader";
import { TaskDetailsContent } from "./details/TaskDetailsContent";
import { TaskDetailsError } from "./details/TaskDetailsError";
import { TaskDetailsSkeleton } from "./details/TaskDetailsSkeleton";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskDialog } from "./details/DeleteTaskDialog";
import type { Task } from "@/types/task";
import { TaskFormStatus } from "./form/TaskFormStatus";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/validations";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useTaskMutations } from "@/hooks/useTaskMutations";

const TaskDetailsContainer = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { invalidateTaskQueries } = useTaskMutations();

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

      if (error) {
        console.error('Error fetching task:', error);
        throw error;
      }
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
    enabled: !!taskId,
    retry: 1,
  });
  
  const form = useForm<Omit<Task, "assigned_to_profile">>({
        resolver: zodResolver(taskSchema),
        defaultValues: task
        ? {
          title: task.title,
          description: task.description || '',
          priority: task.priority,
          due_date: task.due_date || '',
          assigned_to: task.assigned_to || '',
          status: task.status,
            id: task.id,
            family_id: task.family_id,
              created_by: task.created_by,
            created_at: task.created_at,
            updated_at: task.updated_at,
      
        } : {
          title: "",
          description: "",
          priority: "medium",
          due_date: "",
          assigned_to: "",
          status: "todo",
            id: "",
              family_id: "",
            created_by: "",
              created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        } 
  });

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            if (!user) throw new Error("User not authenticated");
        
        const taskData = {
            title: data.title,
            description: data.description,
            priority: data.priority,
            due_date: data.due_date,
            assigned_to: data.assignedTo?.[0],
            status: data.status,
        };
    
        if (task?.id) {
            const { error } = await supabase
            .from('tasks')
            .update(taskData)
            .eq('id', task.id);
            if (error) throw error;
        }
        },
        onSuccess: () => {
            toast.success("Task updated successfully");
        invalidateTaskQueries();
        
            if (task?.id) {
            queryClient.invalidateQueries({ queryKey: ['task', task.id] });
        }
        },
        onError: (error) => {
            console.error('Error saving task:', error);
            toast.error("Failed to update task");
        }
    });


  const handleStatusChange = (value:  'todo' | 'in_progress' | 'completed' | 'cancelled') => {
     form.setValue("status", value)
    mutation.mutate(form.getValues())
  }

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

  if (isLoading || !task) {
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
            onEdit={() => setIsEditModalOpen(true)}
            onDelete={() => setIsDeleteDialogOpen(true)}
          />
          <TaskFormStatus 
             status={form.watch("status")}
            onStatusChange={handleStatusChange}
          />
          <TaskDetailsContent 
            description={task.description}
            dueDate={task.due_date}
            assignedToName={task.assigned_to_profile?.full_name}
          />
        </Card>
      </div>

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
    </MainContent>
  );
};

export default TaskDetailsContainer;

