import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { TaskDetailsHeader } from "./details/TaskDetailsHeader";
import { TaskDetailsContent } from "./details/TaskDetailsContent";
import { TaskDetailsError } from "./details/TaskDetailsError";
import { TaskDetailsSkeleton } from "./details/TaskDetailsSkeleton";

export const TaskDetailsPage = () => {
  const { taskId } = useParams();

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
      
      return data;
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (error) {
    toast.error("Failed to load task details");
    return (
      <div className="p-6">
        <Card>
          <TaskDetailsError />
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <Card>
          <TaskDetailsSkeleton />
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="max-w-4xl mx-auto">
        <TaskDetailsHeader 
          title={task.title}
          priority={task.priority}
          status={task.status}
        />
        <TaskDetailsContent 
          description={task.description}
          dueDate={task.due_date}
          assignedToName={task.assigned_to_profile?.full_name}
        />
      </Card>
    </div>
  );
};