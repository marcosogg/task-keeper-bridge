import { useQuery } from "@tanstack/react-query";
import { startOfWeek, endOfWeek } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Task } from "@/types/task";

export const useCalendarTasks = (view: "month" | "week" | "day", currentMonth: Date) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['tasks', user?.id, view, currentMonth],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (familyError) {
        console.error('Error fetching family member:', familyError);
        throw familyError;
      }

      if (!familyMember) {
        console.error('No family member found');
        return [];
      }

      let query = supabase
        .from('tasks')
        .select(`
          *,
          assigned_to:profiles!tasks_assigned_to_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq('family_id', familyMember.family_id);

      if (view === "week") {
        const start = startOfWeek(currentMonth);
        const end = endOfWeek(currentMonth);
        query = query
          .gte('due_date', start.toISOString())
          .lte('due_date', end.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }
      
      return (data as any[]).map(task => ({
        ...task,
        status: task.status as Task['status'],
        priority: task.priority as Task['priority']
      })) as Task[];
    },
    enabled: !!user
  });
};