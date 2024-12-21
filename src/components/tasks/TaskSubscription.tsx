// src/components/tasks/TaskSubscription.tsx
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import type { Task } from "@/types/task";

interface TaskSubscriptionProps {
}

export const TaskSubscription = ({}: TaskSubscriptionProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!user) return;

    const getFamilyId = async () => {
        const { data: familyMember, error } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (error){
        console.error("Error on getFamilyId", error)
          return null;
      }
      return familyMember?.family_id;
    };

    getFamilyId().then(familyId => {
         if (!familyId) return;

         console.log('Setting up real-time subscription for family:', familyId);

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
            (payload: RealtimePostgresChangesPayload<Task>) => {
              console.log('Real-time event received:', payload);
                queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
                if (payload.new && (payload.new as any).id) {
                  queryClient.invalidateQueries({queryKey: ['task', (payload.new as any).id]});
                  }
            }
          )
           .subscribe(status => {
              console.log('Subscription status:', status);
              if(status !== 'SUBSCRIBED') {
                 console.error('Subscription error', status);
                 }
          });
            
           channelRef.current = channel;
        });
    return () => {
      if (channelRef.current) {
            console.log('Unsubscribing from real-time updates');
              supabase.removeChannel(channelRef.current);
        }
    };
  }, [user, queryClient]);

  return null;
};
