import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useFamilyStats } from "@/hooks/queries/useFamilyStats";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingState } from "./family/LoadingState";
import { EmptyFamilyState } from "./family/EmptyFamilyState";
import { FamilyHeader } from "./family/FamilyHeader";
import { FamilyMembersList } from "./family/FamilyMembersList";
import { FamilyStatistics } from "./family/FamilyStatistics";

export const FamilyOverview = () => {
  const { user } = useAuth();

  const { data: familyMembers, isLoading } = useQuery({
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

  const familyId = familyMembers?.[0]?.families?.id;
  const { memberStats, isLoading: isLoadingStats } = useFamilyStats(familyId);

  if (isLoading || isLoadingStats) {
    return <LoadingState />;
  }

  if (!familyMembers?.length) {
    return <EmptyFamilyState />;
  }

  return (
    <Card>
      <CardHeader>
        <FamilyHeader familyName={familyMembers[0]?.families?.name || 'Your Family'} />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FamilyMembersList members={familyMembers} memberStats={memberStats} />
          <FamilyStatistics memberStats={memberStats} />
        </div>
      </CardContent>
    </Card>
  );
};