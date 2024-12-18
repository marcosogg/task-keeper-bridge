import { useQuery } from "@tanstack/react-query";
import type { PriorityItem } from "@/types/common";

const fetchPriorityItems = async () => {
  // Simulating API call with mock data
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockPriorityItems;
};

const mockPriorityItems: PriorityItem[] = [
  {
    id: "1",
    title: "Family Dinner Planning",
    type: "task",
    dueDate: "2024-03-20",
    priority: "high",
    status: "pending",
    assignedTo: "Mom"
  },
  {
    id: "2",
    title: "Weekend Getaway",
    type: "event",
    dueDate: "2024-03-25",
    priority: "high",
    status: "pending",
    assignedTo: "Dad"
  },
  {
    id: "3",
    title: "Grocery Shopping",
    type: "task",
    dueDate: "2024-03-15",
    priority: "medium",
    status: "overdue",
    assignedTo: "John"
  }
];

export const usePriorityItems = () => {
  return useQuery({
    queryKey: ['priorityItems'],
    queryFn: fetchPriorityItems,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};