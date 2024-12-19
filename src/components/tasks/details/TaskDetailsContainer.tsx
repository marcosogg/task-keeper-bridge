import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MainContent } from "@/components/MainContent";
import { useState } from "react";
import { TaskDetailsHeader } from "./TaskDetailsHeader";
import { TaskDetailsContent } from "./TaskDetailsContent";
import { TaskDetailsError } from "./TaskDetailsError";
import { TaskDetailsSkeleton } from "./TaskDetailsSkeleton";
import { EditTaskModal } from "../EditTaskModal";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import type { Task } from "@/types/task";

export const TaskDetailsContainer = () => {
  const { taskId } = useParams();
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
            onEdit={() => setIsEditModalOpen(true)}
            onDelete={() => setIsDeleteDialogOpen(true)}
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