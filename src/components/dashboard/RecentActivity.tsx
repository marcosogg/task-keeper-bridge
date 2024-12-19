import { AlertOctagon, Star, Flag, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

interface ActivityItem {
  activity_type: string;
  activity_date: string;
  profile_id: string;
  description: string;
  related_id: string;
}

export const RecentActivity = () => {
  const { user } = useAuth();
  const limit = 10; // Number of activities to fetch

  const { data: activities, isLoading, error } = useQuery({
    queryKey: ['family-activity', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      // First get the user's family_id
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

  // Set up real-time subscription
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
          // Invalidate and refetch
          void queryClient.invalidateQueries({ queryKey: ['family-activity'] });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user]);

  if (error) {
    console.error('Error fetching activity:', error);
    toast.error("Failed to load recent activity");
    return null;
  }

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <AlertOctagon className="h-4 w-4 text-red-500" aria-hidden="true" />;
      case 'message':
        return <Star className="h-4 w-4 text-orange-500" aria-hidden="true" />;
      default:
        return <Flag className="h-4 w-4 text-blue-500" aria-hidden="true" />;
    }
  };

  const getPriorityColor = (type: string) => {
    switch (type) {
      case 'task':
        return 'bg-red-50 border-red-100';
      case 'message':
        return 'bg-orange-50 border-orange-100';
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="text-center py-8 text-gray-500">
          No recent activity to display
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm" role="region" aria-label="Recent activity">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4" id="recent-activity-heading">
        Recent Activity
      </h2>
      <div className="space-y-3 md:space-y-4" aria-labelledby="recent-activity-heading">
        {activities.map((activity, index) => (
          <div 
            key={`${activity.related_id}-${index}`}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
              getPriorityColor(activity.activity_type)
            )}
            role="listitem"
          >
            <div 
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 text-sm"
              aria-hidden="true"
            >
              {activity.profile_id[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {getPriorityIcon(activity.activity_type)}
                <p className="text-sm text-gray-900">
                  {activity.description}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(activity.activity_date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};