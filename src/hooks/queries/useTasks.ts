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

      return data.map(task => ({
        ...task,
        assignedTo: task.assigned_to ? [task.assigned_to.full_name || task.assigned_to.email] : [],
      })) as Task[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};