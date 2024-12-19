import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Task } from "@/types/task";

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          profile:profiles!tasks_assigned_to_fkey (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }

      return data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || undefined,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date || undefined,
        assigned_to: task.assigned_to,
        created_by: task.created_by,
        family_id: task.family_id,
        created_at: task.created_at,
        updated_at: task.updated_at,
        completed_at: task.completed_at || undefined,
        assigned_to_profile: task.profile || undefined
      })) as Task[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};