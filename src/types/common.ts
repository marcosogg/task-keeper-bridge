export type Status = 'active' | 'inactive' | 'pending' | 'archived';

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