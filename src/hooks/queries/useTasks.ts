import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Task } from "@/types/task";

interface TaskResponse {
  id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  assigned_to: {
    full_name: string | null;
    email: string | null;
  } | null;
  created_by: string;
  family_id: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          assigned_to:profiles!tasks_assigned_to_fkey (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }

      return (data as TaskResponse[]).map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || undefined,
        status: task.status,
        priority: task.priority,
        dueDate: task.due_date || undefined,
        assignedTo: task.assigned_to ? [task.assigned_to.full_name || task.assigned_to.email || 'Unknown'] : [],
        createdBy: task.created_by,
        familyId: task.family_id,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
        completedAt: task.completed_at || undefined,
        assigned_to: task.assigned_to || undefined
      })) as Task[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};