export interface Note {
  id: string;
  title?: string;
  content: string;
  is_checklist: boolean;
  created_by: string;
  family_id: string;
  created_at: string;
  updated_at: string;
  creator?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}