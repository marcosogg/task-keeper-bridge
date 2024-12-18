import { BaseEntity } from './common';

export interface Event extends BaseEntity {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  familyId: string;
  createdBy: string;
  attendees?: string[];
  isRecurring?: boolean;
  recurrencePattern?: string;
  reminder?: boolean;
  reminderTime?: string;
}

export type EventFormData = Omit<Event, keyof BaseEntity | 'familyId' | 'createdBy'>;