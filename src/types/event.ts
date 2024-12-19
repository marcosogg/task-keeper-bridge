export interface Event {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
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