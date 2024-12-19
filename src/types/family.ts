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
  role: string;
  status: string;
  joined_at?: string;
  created_at: string;
  profiles?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
  families?: {
    name: string;
    id: string;
  };
}