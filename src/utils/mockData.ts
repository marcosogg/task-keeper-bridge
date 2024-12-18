import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  { 
    id: '1', 
    title: 'Family Dinner', 
    dueDate: new Date().toISOString(),
    priority: 'high',
    status: 'todo',
    createdBy: 'user1',
    familyId: 'family1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: '2', 
    title: 'Soccer Practice', 
    dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    priority: 'medium',
    status: 'todo',
    createdBy: 'user1',
    familyId: 'family1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: '3', 
    title: 'Grocery Shopping', 
    dueDate: new Date().toISOString(),
    priority: 'low',
    status: 'todo',
    createdBy: 'user1',
    familyId: 'family1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

export const fetchTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockTasks;
};