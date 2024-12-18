import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  assignedTo: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Family Dinner Planning",
    dueDate: "2024-03-20",
    priority: "high",
    status: "todo",
    assignedTo: "Mom"
  },
  {
    id: "2",
    title: "Weekend Getaway Preparation",
    dueDate: "2024-03-25",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Dad"
  },
  {
    id: "3",
    title: "Grocery Shopping",
    dueDate: "2024-03-15",
    priority: "low",
    status: "completed",
    assignedTo: "John"
  }
];

const fetchTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockTasks;
};

export const TaskList = () => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  if (isLoading) {
    return (
      <div className="space-y-4" role="list" aria-label="Loading tasks">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4" role="list">
      {tasks?.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          role="listitem"
        >
          <div className="flex items-center space-x-4">
            {task.priority === "high" ? (
              <AlertTriangle className="h-5 w-5 text-red-500" aria-label="High priority" />
            ) : task.priority === "medium" ? (
              <Clock className="h-5 w-5 text-yellow-500" aria-label="Medium priority" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-500" aria-label="Low priority" />
            )}
            <div>
              <p className="font-medium text-gray-900">{task.title}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>Assigned to: {task.assignedTo}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary">
              {task.status === "todo" ? "To Do" : 
               task.status === "in-progress" ? "In Progress" : 
               "Completed"}
            </div>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};