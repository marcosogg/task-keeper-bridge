import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";
import { ActivityList } from "./activity/ActivityList";
import { LoadingState } from "./activity/LoadingState";
import { EmptyState } from "./activity/EmptyState";

interface ActivityItem {
  activity_type: string;
  activity_date: string;
  profile_id: string;
  description: string;
  related_id: string;
}

export const RecentActivity = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const limit = 10; // Number of activities to fetch

  const { data: activities, isLoading, error } = useQuery({
    queryKey: ['family-activity', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (familyError) throw familyError;
      if (!familyMember) return [];

      const { data, error: activityError } = await supabase
        .rpc('get_family_activity', {
          family_id_param: familyMember.family_id,
          limit_param: limit
        });

      if (activityError) throw activityError;
      return data as ActivityItem[];
    },
    enabled: !!user
  });

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks'
        },
        () => {
          void queryClient.invalidateQueries({ queryKey: ['family-activity'] });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  if (error) {
    console.error('Error fetching activity:', error);
    toast.error("Failed to load recent activity");
    return null;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!activities || activities.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm" role="region" aria-label="Recent activity">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4" id="recent-activity-heading">
        Recent Activity
      </h2>
      <ActivityList activities={activities} />
    </div>
  );
};