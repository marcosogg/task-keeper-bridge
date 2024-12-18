export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignedTo?: string[];
  createdBy: string;
  familyId: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  assigned_to?: {
    full_name: string | null;
    email: string | null;
  };
}

export interface TaskComment {
  id: string;
  taskId: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}