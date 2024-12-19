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

      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', userId)
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
    enabled: !!userId
  });

  if (error) {
    handleError(error);
    onError(error);
    return null;
  }

  return children({ activities, isLoading });
};