import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriorityItem {
  id: string;
  title: string;
  type: "task" | "event";
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "overdue";
}

const mockPriorityItems: PriorityItem[] = [
  {
    id: "1",
    title: "Family Dinner Planning",
    type: "task",
    dueDate: "2024-03-20",
    priority: "high",
    status: "pending"
  },
  {
    id: "2",
    title: "Weekend Getaway",
    type: "event",
    dueDate: "2024-03-25",
    priority: "high",
    status: "pending"
  },
  {
    id: "3",
    title: "Grocery Shopping",
    type: "task",
    dueDate: "2024-03-15",
    priority: "medium",
    status: "overdue"
  }
];

export const InsightsPanel = () => {
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
          {mockPriorityItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                {item.status === "overdue" ? (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                ) : item.priority === "high" ? (
                  <Clock className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(item.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button size="sm" variant={item.status === "overdue" ? "destructive" : "default"}>
                Take Action
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};