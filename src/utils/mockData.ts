import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  { 
    id: '1', 
    title: 'Family Dinner', 
    due_date: new Date().toISOString(),
    priority: 'high',
    status: 'todo',
    created_by: 'user1',
    family_id: 'family1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '2', 
    title: 'Soccer Practice', 
    due_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    priority: 'medium',
    status: 'todo',
    created_by: 'user1',
    family_id: 'family1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: '3', 
    title: 'Grocery Shopping', 
    due_date: new Date().toISOString(),
    priority: 'low',
    status: 'todo',
    created_by: 'user1',
    family_id: 'family1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

export const fetchTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockTasks;
};