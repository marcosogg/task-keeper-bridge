import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  { 
    id: '1', 
    title: 'Family Dinner', 
    date: new Date().toISOString(), 
    priority: 'high' 
  },
  { 
    id: '2', 
    title: 'Soccer Practice', 
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    priority: 'medium' 
  },
  { 
    id: '3', 
    title: 'Grocery Shopping', 
    date: new Date().toISOString(), 
    priority: 'low' 
  },
];

export const fetchTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockTasks;
};