export interface Family {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
  creator?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}

export interface FamilyMember {
  id: string;
  family_id: string;
  profile_id: string;
  role: string; // Changed from 'admin' | 'member' to string to match Supabase
  status: 'pending' | 'active' | 'inactive';
  joined_at?: string;
  created_at: string;
  profile?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
  families?: {
    name: string;
    id: string;
  };
}