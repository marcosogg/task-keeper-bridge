import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useFamilyMembers = (familyId?: string) => {
  return useQuery({
    queryKey: ['familyMembers', familyId],
    queryFn: async () => {
      if (!familyId) return [];
      
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

      if (error) throw error;
      return data;
    },
    enabled: !!familyId,
  });
};