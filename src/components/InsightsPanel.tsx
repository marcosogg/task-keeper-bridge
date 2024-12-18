import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

interface PriorityItem {
  id: string;
  title: string;
  type: "task" | "event";
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "overdue";
  assignedTo: string;
}

// Mock data - replace with actual API call later
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

const fetchPriorityItems = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockPriorityItems;
};

export const InsightsPanel = () => {
  const { data: priorityItems, isLoading } = useQuery({
    queryKey: ['priorityItems'],
    queryFn: fetchPriorityItems,
  });

  if (isLoading) {
    return (
      <Card className="w-full animate-fadeIn">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Family Insights</CardTitle>
          <Skeleton className="h-10 w-20" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Family Insights</CardTitle>
        <Button variant="outline" className="text-primary">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {priorityItems?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                {item.status === "overdue" ? (
                  <AlertTriangle className="h-5 w-5 text-red-500" aria-label="Overdue" />
                ) : item.priority === "high" ? (
                  <Clock className="h-5 w-5 text-yellow-500" aria-label="High Priority" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500" aria-label="Normal Priority" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Assigned to: {item.assignedTo}</span>
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant={item.status === "overdue" ? "destructive" : "default"}
                className="min-w-[100px]"
              >
                Take Action
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};