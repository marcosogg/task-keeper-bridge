import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import type { Task } from "@/types/task";

export const useStatsPanel = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (familyError) throw familyError;

      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          assigned_to:profiles!tasks_assigned_to_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq('family_id', familyMember?.family_id);

      if (error) throw error;
      
      return (data as any[]).map(task => ({
        ...task,
        status: task.status as Task['status'],
        priority: task.priority as Task['priority']
      })) as Task[];
    },
    enabled: !!user
  });

  useEffect(() => {
    if (!user) return;

    const getFamilyId = async () => {
      const { data: familyMember } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();
      
      return familyMember?.family_id;
    };

    getFamilyId().then(familyId => {
      if (!familyId) return;

      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'tasks',
            filter: `family_id=eq.${familyId}`
          },
          () => {
            void queryClient.invalidateQueries({ queryKey: ['tasks'] });
          }
        )
        .subscribe();

      return () => {
        void supabase.removeChannel(channel);
      };
    });
  }, [user, queryClient]);

  return { tasks, isLoading, error };
};