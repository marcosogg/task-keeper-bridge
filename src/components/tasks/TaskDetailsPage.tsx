// src/components/tasks/TaskDetailsPage.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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

const TaskDetailsContainer = () => {
  const { taskId } = useParams<{ taskId: string }>();
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
            assigned_to: data.assigned_to ? [data.assigned_to] : null,
        status: validStatus
        } as Task;
    },
    enabled: !!taskId,
    retry: 1,
  });


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
          <TaskDetailsContent 
            description={task.description}
            dueDate={task.due_date}
            assignedToName={task.assigned_to_profile?.full_name}
              task={task}
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
