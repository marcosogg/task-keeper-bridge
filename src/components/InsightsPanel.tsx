import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePriorityItems } from "@/hooks/queries/usePriorityItems";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingState } from "./dashboard/insights/LoadingState";
import { EmptyState } from "./dashboard/insights/EmptyState";
import { InsightsList } from "./dashboard/insights/InsightsList";

export const InsightsPanel = () => {
  const { data: priorityItems, isLoading, error } = usePriorityItems();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

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
    return <LoadingState />;
  }

  if (!priorityItems || priorityItems.length === 0) {
    return <EmptyState onManageFamily={() => navigate('/family')} />;
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
        <InsightsList items={priorityItems} onActionClick={handleActionClick} />
      </CardContent>
    </Card>
  );
};