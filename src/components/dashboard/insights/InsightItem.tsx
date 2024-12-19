import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface InsightItemProps {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo: string;
}

export const InsightItem = ({
  id,
  title,
  status,
  priority,
  dueDate,
  assignedTo,
}: InsightItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors"
      role="listitem"
    >
      <div className="flex items-center space-x-4">
        {status === "overdue" ? (
          <AlertTriangle className="h-5 w-5 text-red-500" aria-label="Overdue item" />
        ) : priority === "high" ? (
          <Clock className="h-5 w-5 text-yellow-500" aria-label="High priority item" />
        ) : (
          <CheckCircle2 className="h-5 w-5 text-green-500" aria-label="Normal priority item" />
        )}
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Due: {new Date(dueDate).toLocaleDateString()}</span>
            <span aria-hidden="true">•</span>
            <span>Assigned to: {assignedTo}</span>
          </div>
        </div>
      </div>
      <Button 
        size="sm" 
        variant={status === "overdue" ? "destructive" : "default"}
        className="min-w-[100px]"
        onClick={() => navigate(`/tasks/${id}`)}
        aria-label={`View details for ${title}`}
      >
        View Details
      </Button>
    </div>
  );
};