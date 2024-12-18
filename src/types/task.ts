export interface Task {
  id: string;
  title: string;
  date: string;  // ISO string format
  priority: 'high' | 'medium' | 'low';
}