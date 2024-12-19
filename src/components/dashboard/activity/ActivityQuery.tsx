import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { handleError } from "@/lib/error-handling";

interface ActivityQueryProps {
  userId: string;
  limit?: number;
  onError: (error: unknown) => void;
  children: (data: any) => React.ReactNode;
}

export const ActivityQuery = ({ userId, limit = 10, onError, children }: ActivityQueryProps) => {
  const { data: activities, isLoading, error } = useQuery({
    queryKey: ['family-activity', userId],
    queryFn: async () => {
      if (!userId) throw new Error("User not authenticated");

      try {
        const { data: familyMember, error: familyError } = await supabase
          .from('family_members')
          .select('family_id')
          .eq('profile_id', userId)
          .maybeSingle();

        if (familyError) {
          console.error('Error fetching family member:', familyError);
          throw familyError;
        }

        if (!familyMember) {
          console.log('No family member found for user:', userId);
          return [];
        }

        try {
          const { data, error: activityError } = await supabase
            .rpc('get_family_activity', {
              family_id_param: familyMember.family_id,
              limit_param: limit
            });

          if (activityError) {
            console.error('Error fetching activity:', activityError);
            return [];
          }

          return data || [];
        } catch (rpcError) {
          console.error('RPC call failed:', rpcError);
          return [];
        }
      } catch (error) {
        console.error('Error in ActivityQuery:', error);
        throw error;
      }
    },
    enabled: !!userId,
    retry: false
  });

  if (error) {
    console.error('Query error:', error);
    onError(error);
    return children({ activities: [], isLoading: false });
  }

  return children({ activities: activities || [], isLoading });
};