import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityList } from "./activity/ActivityList";
import { LoadingState } from "./activity/LoadingState";
import { EmptyState } from "./activity/EmptyState";

export const RecentActivity = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const limit = 10;

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
      return data;
    },
    enabled: !!user
  });

  // Set up real-time subscription for tasks and messages
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
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages'
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
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityList activities={activities} />
      </CardContent>
    </Card>
  );
};