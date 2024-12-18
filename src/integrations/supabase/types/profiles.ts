export type ProfilesSchema = {
  Tables: {
    profiles: {
      Row: {
        id: string;
        email: string | null;
        full_name: string | null;
        avatar_url: string | null;
        role: string | null;
        created_at: string;
        updated_at: string;
      };
      Insert: {
        id: string;
        email?: string | null;
        full_name?: string | null;
        avatar_url?: string | null;
        role?: string | null;
        created_at?: string;
        updated_at?: string;
      };
      Update: {
        id?: string;
        email?: string | null;
        full_name?: string | null;
        avatar_url?: string | null;
        role?: string | null;
        created_at?: string;
        updated_at?: string;
      };
      Relationships: [];
    };
  };
};