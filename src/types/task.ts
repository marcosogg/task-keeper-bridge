export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignedTo?: string[];
  createdBy: string;
  familyId: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  tags?: string[];
}

export interface TaskComment {
  id: string;
  taskId: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}