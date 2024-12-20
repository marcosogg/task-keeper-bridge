export interface Conversation {
  id: string;
  name?: string | null;
  created_at: string;
  created_by: string;
  family_id: string;
  conversation_members?: Array<{
    profile: {
      id: string;
      full_name: string | null;
      avatar_url: string | null;
    };
  }>;
}

export interface ConversationMember {
  id: string;
  conversation_id: string;
  profile_id: string;
  created_at: string;
  profile?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  sender: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}