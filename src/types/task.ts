// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  due_date?: string | null;
  assigned_to: string[] | null;
  created_by: string;
  family_id: string;
  created_at: string;
  updated_at: string;
  completed_at?: string | null;
  assigned_to_profile?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  }[];
}

export interface TaskComment {
  id: string;
  taskId: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
