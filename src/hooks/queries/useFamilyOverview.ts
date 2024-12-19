import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const useFamilyOverview = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: familyMembers, isLoading, error } = useQuery({
    queryKey: ['familyMembers'],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('family_members')
        .select(`
          *,
          profiles:profile_id (
            full_name,
            email,
            avatar_url
          ),
          families:family_id (
            name,
            id
          )
        `)
        .eq('status', 'active')
        .eq('profile_id', user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Set up real-time subscription
  useEffect(() => {
    const familyId = familyMembers?.[0]?.families?.id;
    if (!user || !familyId) return;

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'family_members',
          filter: `family_id=eq.${familyId}`
        },
        () => {
          void queryClient.invalidateQueries({ queryKey: ['familyMembers'] });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user, familyMembers, queryClient]);

  return {
    familyMembers,
    isLoading,
    error,
    familyId: familyMembers?.[0]?.families?.id
  };
};