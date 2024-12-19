import { AlertTriangle, CheckCircle2, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePriorityItems } from "@/hooks/queries/usePriorityItems";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export const InsightsPanel = () => {
  const { data: priorityItems, isLoading, error } = usePriorityItems();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // First get the user's family_id
    const getFamilyId = async () => {
      const { data: familyMember } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();
      
      return familyMember?.family_id;
    };

    getFamilyId().then(familyId => {
      if (!familyId) return;

      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'tasks',
            filter: `family_id=eq.${familyId}`
          },
          () => {
            // Invalidate and refetch priority items
            void queryClient.invalidateQueries({ queryKey: ['priorityItems'] });
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('Subscribed to tasks changes');
          }
        });

      return () => {
        void supabase.removeChannel(channel);
      };
    });
  }, [user, queryClient]);

  // Handle error state
  if (error) {
    console.error('Error fetching priority items:', error);
    toast({
      title: "Error",
      description: "Failed to load insights. Please try again later.",
      variant: "destructive",
    });
    return null;
  }

  if (isLoading) {
    return (
      <Card className="w-full h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Family Insights</CardTitle>
          <Skeleton className="h-9 w-[100px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-8 w-[100px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!priorityItems || priorityItems.length === 0) {
    return (
      <Card className="w-full h-full animate-fadeIn" role="region" aria-label="Family insights">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold" id="insights-heading">Family Insights</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
          <Users className="h-12 w-12 text-gray-400" />
          <div className="text-center">
            <h3 className="font-medium text-gray-900">No Family Group</h3>
            <p className="text-sm text-gray-500 mt-1">Join or create a family group to see insights</p>
          </div>
          <Button onClick={() => navigate('/family')} className="mt-4">
            Manage Family
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleActionClick = (itemId: string) => {
    toast({
      title: "Action Taken",
      description: "Navigating to task details...",
    });
    navigate(`/tasks/${itemId}`);
  };

  return (
    <Card className="w-full h-full animate-fadeIn" role="region" aria-label="Family insights">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold" id="insights-heading">Family Insights</CardTitle>
        <Button 
          variant="outline" 
          className="text-primary"
          onClick={() => navigate('/tasks')}
          aria-label="View all insights"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" role="list" aria-labelledby="insights-heading">
          {priorityItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors"
              role="listitem"
            >
              <div className="flex items-center space-x-4">
                {item.status === "overdue" ? (
                  <AlertTriangle className="h-5 w-5 text-red-500" aria-label="Overdue item" />
                ) : item.priority === "high" ? (
                  <Clock className="h-5 w-5 text-yellow-500" aria-label="High priority item" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500" aria-label="Normal priority item" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                    <span aria-hidden="true">•</span>
                    <span>Assigned to: {item.assignedTo}</span>
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant={item.status === "overdue" ? "destructive" : "default"}
                className="min-w-[100px]"
                onClick={() => handleActionClick(item.id)}
                aria-label={`Take action on ${item.title}`}
              >
                Take Action
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};