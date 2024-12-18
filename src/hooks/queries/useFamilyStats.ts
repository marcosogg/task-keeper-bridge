import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface FamilyMemberStats {
  profile_id: string;
  total_tasks: number;
  completed_tasks: number;
  overdue_tasks: number;
}

interface FamilyActivity {
  activity_type: string;
  activity_date: string;
  profile_id: string;
  description: string;
  related_id: string;
}

export const useFamilyStats = (familyId: string | undefined) => {
  const { data: memberStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["familyMemberStats", familyId],
    queryFn: async () => {
      if (!familyId) return null;
      const { data, error } = await supabase
        .rpc('get_family_member_stats', { family_id_param: familyId });
      if (error) throw error;
      return data as FamilyMemberStats[];
    },
    enabled: !!familyId,
  });

  const { data: recentActivity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["familyActivity", familyId],
    queryFn: async () => {
      if (!familyId) return null;
      const { data, error } = await supabase
        .rpc('get_family_activity', { 
          family_id_param: familyId,
          limit_param: 5
        });
      if (error) throw error;
      return data as FamilyActivity[];
    },
    enabled: !!familyId,
  });

  return {
    memberStats,
    recentActivity,
    isLoading: isLoadingStats || isLoadingActivity,
  };
};