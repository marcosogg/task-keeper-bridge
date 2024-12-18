import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useFamilyStats } from "@/hooks/queries/useFamilyStats";
import { FamilyMemberAvatar } from "./family/FamilyMemberAvatar";
import { FamilyMemberTooltip } from "./family/FamilyMemberTooltip";
import { FamilyStatistics } from "./family/FamilyStatistics";
import { useAuth } from "@/contexts/AuthContext";

export const FamilyOverview = () => {
  const navigate = useNavigate();
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
    return (
      <Card>
        <CardHeader>
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-20 bg-gray-100 rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!familyMembers?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Get Started with Your Family</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Create or join a family group to start managing tasks and events together.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/family')}>
              <Users className="mr-2 h-4 w-4" />
              Create Family
            </Button>
            <Button variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              Join Family
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          {familyMembers[0]?.families?.name || 'Your Family'}
        </CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate('/family')}>
          <Users className="mr-2 h-4 w-4" />
          Manage Family
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex -space-x-2 overflow-hidden">
            {familyMembers.map((member) => {
              const stats = memberStats?.find(s => s.profile_id === member.profile_id);
              return (
                <FamilyMemberAvatar
                  key={member.id}
                  avatarUrl={member.profiles?.avatar_url}
                  name={member.profiles?.full_name || ''}
                  email={member.profiles?.email || ''}
                >
                  <FamilyMemberTooltip
                    name={member.profiles?.full_name || member.profiles?.email || 'Unknown'}
                    stats={stats}
                  />
                </FamilyMemberAvatar>
              );
            })}
          </div>
          <FamilyStatistics memberStats={memberStats} />
        </div>
      </CardContent>
    </Card>
  );
};