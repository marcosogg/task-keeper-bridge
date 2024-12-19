import { supabase } from '@/integrations/supabase/client';
import { Channel, ChannelMember, Message, CreateChannelInput } from '@/types/messaging';

export const messagingService = {
  async createChannel(input: CreateChannelInput): Promise<Channel> {
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .insert([
        {
          family_id: input.family_id,
          name: input.name,
          type: input.type,
        },
      ])
      .select()
      .single();

    if (channelError) throw channelError;

    // Add members to the channel
    const members = input.member_ids.map((profile_id) => ({
      channel_id: channel.id,
      profile_id,
    }));

    const { error: membersError } = await supabase
      .from('channel_members')
      .insert(members);

    if (membersError) throw membersError;

    return channel;
  },

  async getChannels(familyId: string): Promise<Channel[]> {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .eq('family_id', familyId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getChannelMembers(channelId: string): Promise<ChannelMember[]> {
    const { data, error } = await supabase
      .from('channel_members')
      .select('*, profiles(full_name, email, avatar_url)')
      .eq('channel_id', channelId);

    if (error) throw error;
    return data;
  },

  async getMessages(channelId: string, limit = 50): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:profiles(full_name, email, avatar_url)')
      .eq('channel_id', channelId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async sendMessage(channelId: string, content: string): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          channel_id: channelId,
          content,
        },
      ])
      .select('*, sender:profiles(full_name, email, avatar_url)')
      .single();

    if (error) throw error;
    return data;
  },

  subscribeToMessages(channelId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`messages:${channelId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`,
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();
  },
};
