import { BaseEntity, Taggable } from './common';

export interface Note extends BaseEntity, Taggable {
  title?: string;
  content: string;
  isChecklist: boolean;
  checklistItems?: ChecklistItem[];
  familyId: string;
  createdBy: string;
  pinned?: boolean;
}

export interface ChecklistItem {
  id: string;
  content: string;
  completed: boolean;
  order: number;
}

export type NoteFormData = Omit<Note, keyof BaseEntity | 'familyId' | 'createdBy'>;