// src/types/task.ts

export interface TaskAssignment {
  task_id: string;
  profile_id: string;
  assigned_at: string;
  profile: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
      id: string;
  };
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  due_date?: string | null;
  created_by: string;
  family_id: string;
  created_at: string;
  updated_at: string;
  completed_at?: string | null;
  assignments?: TaskAssignment[];
  assigned_to?: string[];
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
