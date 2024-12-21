import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Task } from "@/types/task";
import type { TaskResponse } from "@/integrations/supabase/types/responses";

export const useTasks = (
  filter: 'all' | 'assigned' | 'created' | 'completed',
  sort: 'date' | 'priority' | 'created'
) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['tasks', user?.id, filter, sort],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (familyError) {
        console.error('Error fetching family:', familyError);
        throw familyError;
      }

      if (!familyMember) {
        return [];
      }

      let query = supabase
        .from('tasks')
        .select(`
          *,
          assigned_to_profile:task_assignments!task_assignments_task_id_fkey (
              profiles!task_assignments_profile_id_fkey (
                full_name,
                email,
                avatar_url,
                id
              )
          )
        `)
        .eq('family_id', familyMember.family_id);

      // Apply filters
      if (filter === 'assigned') {
         query = query.contains('assigned_to', [user.id]);
      } else if (filter === 'created') {
        query = query.eq('created_by', user.id);
      } else if (filter === 'completed') {
          query = query.eq('status', 'completed');
      }

      // Apply sorting
      let orderColumn = 'created_at';
      if (sort === 'date') {
        orderColumn = 'due_date';
      } else if (sort === 'priority') {
        orderColumn = 'priority';
      }

        query = query.order(orderColumn, { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }

      // Transform the response data to ensure status is valid
      return (data as any[]).map(task => {
        const validStatus = ['todo', 'in_progress', 'completed', 'cancelled'].includes(task.status)
          ? (task.status as Task['status'])
          : 'todo';
            
          const assigned_to = task.assigned_to_profile?.map((assignee: any) => assignee.profiles.id) || [];
          const assigned_to_profile = task.assigned_to_profile?.map((assignee: any) => ({
              full_name: assignee.profiles.full_name,
              email: assignee.profiles.email,
              avatar_url: assignee.profiles.avatar_url,
          })) || [];

        return {
          ...task,
          status: validStatus,
          assigned_to,
          assigned_to_profile
        } as Task;
      });
    },
    enabled: !!user,
      refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5 //5 minutes
  });
};
