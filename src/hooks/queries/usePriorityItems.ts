import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PriorityItem } from "@/types/common";

export const usePriorityItems = () => {
  return useQuery({
    queryKey: ['priorityItems'],
    queryFn: async () => {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select(`
          id,
          title,
          due_date,
          priority,
          status,
          assigned_to:profiles!tasks_assigned_to_fkey (
            full_name,
            email
          )
        `)
        .order('due_date', { ascending: true })
        .limit(5);

      if (error) {
        console.error('Error fetching priority items:', error);
        throw error;
      }

      return tasks.map(task => ({
        id: task.id,
        title: task.title,
        type: 'task',
        dueDate: task.due_date,
        priority: task.priority,
        status: task.status === 'completed' ? 'completed' : 
               new Date(task.due_date) < new Date() ? 'overdue' : 'pending',
        assignedTo: task.assigned_to?.full_name || task.assigned_to?.email || 'Unassigned'
      })) as PriorityItem[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};