import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const PRESENCE_CHANNEL = 'presence';

export const usePresence = (familyId: string | undefined) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.id || !familyId) return;

    // Join presence channel
    const channel = supabase.channel(`${PRESENCE_CHANNEL}:${familyId}`, {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    // Track user presence
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        queryClient.setQueryData(['presence', familyId], state);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences);
        queryClient.setQueryData(['presence', familyId], (old: any) => ({
          ...old,
          [key]: newPresences,
        }));
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        console.log('leave', key);
        queryClient.setQueryData(['presence', familyId], (old: any) => {
          const newState = { ...old };
          delete newState[key];
          return newState;
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });

    // Cleanup
    return () => {
      channel.unsubscribe();
    };
  }, [user?.id, familyId, queryClient]);

  return {
    getOnlineMembers: () => {
      return queryClient.getQueryData(['presence', familyId]) || {};
    },
  };
};
