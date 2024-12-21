// src/hooks/useStatsPanel.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Task } from "@/types/task";
import { useEffect } from "react";

export const useStatsPanel = () => {
  const { user } = useAuth();

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
    enabled: !!user,
       refetchOnWindowFocus: true
  });

  return { tasks, isLoading, error };
};
