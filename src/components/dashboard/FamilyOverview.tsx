import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useFamilyStats } from "@/hooks/queries/useFamilyStats";

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
            name,
            id
          )
        `)
        .eq('status', 'active');

      if (error) throw error;
      return data;
    },
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
                <div
                  key={member.id}
                  className="group relative"
                >
                  <div
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
                  {stats && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block">
                      <div className="bg-white p-2 rounded-lg shadow-lg text-xs whitespace-nowrap border">
                        <p className="font-medium">{member.profiles?.full_name || member.profiles?.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                            {stats.completed_tasks}/{stats.total_tasks}
                          </span>
                          {stats.overdue_tasks > 0 && (
                            <span className="flex items-center text-red-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {stats.overdue_tasks} overdue
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Completed Tasks</p>
                <p className="text-2xl font-bold text-green-600">
                  {memberStats?.reduce((acc, curr) => acc + Number(curr.completed_tasks), 0) || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Active Tasks</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {memberStats?.reduce((acc, curr) => 
                    acc + (Number(curr.total_tasks) - Number(curr.completed_tasks)), 0) || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Overdue Tasks</p>
                <p className="text-2xl font-bold text-red-600">
                  {memberStats?.reduce((acc, curr) => acc + Number(curr.overdue_tasks), 0) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};