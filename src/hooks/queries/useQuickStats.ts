import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface QuickStats {
  activeTasks: number;
  upcomingEvents: number;
}

export const useQuickStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['quickStats', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      // First get the user's family_id
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
        return { activeTasks: 0, upcomingEvents: 0 };
      }

      // Get active tasks count
      const { count: activeTasks, error: tasksError } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('family_id', familyMember.family_id)
        .in('status', ['todo', 'in_progress']);

      if (tasksError) {
        console.error('Error fetching tasks:', tasksError);
        throw tasksError;
      }

      // Get upcoming events count (events in the next 7 days)
      const { count: upcomingEvents, error: eventsError } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .eq('family_id', familyMember.family_id)
        .gte('start_date', new Date().toISOString())
        .lte('start_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString());

      if (eventsError) {
        console.error('Error fetching events:', eventsError);
        throw eventsError;
      }

      return {
        activeTasks: activeTasks || 0,
        upcomingEvents: upcomingEvents || 0,
      };
    },
    enabled: !!user,
  });
};