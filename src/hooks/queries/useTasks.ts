import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/utils/mockData";
import type { Task } from "@/types/task";

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data: Task[]) => {
      return data.sort((a, b) => 
        new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime()
      );
    },
  });
};