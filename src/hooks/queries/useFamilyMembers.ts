import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useFamilyMembers = (familyId?: string) => {
  return useQuery({
    queryKey: ['familyMembers', familyId],
    queryFn: async () => {
      if (!familyId) return [];
      
      try {
        const { data, error } = await supabase
          .from('family_members')
          .select(`
            *,
            profiles:profile_id (
              id,
              full_name,
              email,
              avatar_url,
              role
            )
          `)
          .eq('family_id', familyId)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching family members:', error);
          throw error;
        }

        return data;
      } catch (error) {
        console.error('Failed to fetch family members:', error);
        throw error;
      }
    },
    enabled: !!familyId,
    retry: 3, // Retry failed requests 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};