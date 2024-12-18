import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const usePriorityItems = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['priorityItems', user?.id],
    queryFn: async () => {
      if (!user) return [];

      // First get the user's family_id using maybeSingle()
      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (familyError) {
        console.error('Error fetching family:', familyError);
        return [];
      }

      if (!familyMember) {
        return [];
      }

      // Then get the priority items for that family
      const { data: tasks, error: tasksError } = await supabase
        .from('tasks')
        .select(`
          id,
          title,
          status,
          priority,
          due_date,
          assigned_to,
          profiles!tasks_assigned_to_fkey (
            full_name,
            email
          )
        `)
        .eq('family_id', familyMember.family_id)
        .in('status', ['todo', 'in_progress'])
        .order('due_date', { ascending: true })
        .limit(5);

      if (tasksError) {
        console.error('Error fetching tasks:', tasksError);
        return [];
      }

      return tasks.map(task => ({
        id: task.id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        dueDate: task.due_date,
        assignedTo: task.profiles?.full_name || task.profiles?.email || 'Unassigned'
      }));
    },
    enabled: !!user,
  });
};