export type Status = 'active' | 'inactive' | 'pending' | 'archived' | 'overdue';

export type Priority = 'low' | 'medium' | 'high';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assignable {
  assignedTo?: string[];
  assignedBy?: string;
}

export interface Taggable {
  tags?: string[];
}

export interface PriorityItem {
  id: string;
  title: string;
  type: 'task' | 'event';
  dueDate: string;
  priority: Priority;
  status: Status;
  assignedTo: string;
}