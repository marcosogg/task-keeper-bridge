export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  related_id?: string;
  profile_id: string;
  family_id: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}