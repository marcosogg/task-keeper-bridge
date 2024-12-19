import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Task } from "@/types/task";
import type { TaskResponse } from "@/integrations/supabase/types/responses";

export const useTasks = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['tasks', user?.id],
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
        .eq('family_id', familyMember.family_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }

      // Transform the response data to ensure status is valid
      return (data as TaskResponse[]).map(task => {
        const validStatus = ['todo', 'in_progress', 'completed', 'cancelled'].includes(task.status)
          ? (task.status as Task['status'])
          : 'todo';

        return {
          ...task,
          status: validStatus
        } as Task;
      });
    },
    enabled: !!user,
  });
};