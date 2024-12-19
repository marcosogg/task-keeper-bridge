import type { Database } from './schema';

export type TaskResponse = Database['public']['Tables']['tasks']['Row'] & {
  assigned_to_profile?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
};

export type ProfileResponse = Database['public']['Tables']['profiles']['Row'];

export type FamilyResponse = Database['public']['Tables']['families']['Row'];

export type FamilyMemberResponse = Database['public']['Tables']['family_members']['Row'] & {
  profiles?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
};

export type EventResponse = Database['public']['Tables']['events']['Row'];

export type NoteResponse = Database['public']['Tables']['notes']['Row'] & {
  creator?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
};

export type MessageResponse = Database['public']['Tables']['messages']['Row'] & {
  sender?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
};

export type NotificationResponse = Database['public']['Tables']['notifications']['Row'];

export type ConversationResponse = Database['public']['Tables']['conversations']['Row'] & {
  members?: {
    profile_id: string;
    profiles?: {
      full_name: string | null;
      email: string | null;
      avatar_url: string | null;
    };
  }[];
};