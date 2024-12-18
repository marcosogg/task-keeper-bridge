import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FamilyOverview = () => {
  const navigate = useNavigate();

  const { data: familyMembers, isLoading } = useQuery({
    queryKey: ['familyMembers'],
    queryFn: async () => {
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
            name
          )
        `)
        .eq('status', 'active');

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
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
        <div className="space-y-4">
          <div className="flex -space-x-2 overflow-hidden">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                style={{
                  backgroundColor: member.profiles?.avatar_url
                    ? 'transparent'
                    : `hsl(${Math.random() * 360}, 70%, 80%)`,
                }}
              >
                {member.profiles?.avatar_url ? (
                  <img
                    src={member.profiles.avatar_url}
                    alt={member.profiles.full_name || member.profiles.email}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white font-medium">
                    {(member.profiles?.full_name || member.profiles?.email || '')
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            {familyMembers.length} family member{familyMembers.length !== 1 ? 's' : ''}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};