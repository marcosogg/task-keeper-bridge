export interface Channel {
  id: string;
  family_id: string;
  name: string;
  type: 'private' | 'group';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ChannelMember {
  id: string;
  channel_id: string;
  profile_id: string;
  joined_at: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}

export interface Message {
  id: string;
  channel_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  sender?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}

export interface CreateChannelInput {
  family_id: string;
  name: string;
  type: 'private' | 'group';
  member_ids: string[];
}
