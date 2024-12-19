import { AlertOctagon, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface ActivityItemProps {
  type: string;
  date: string;
  description: string;
}

export const ActivityItem = ({ type, date, description }: ActivityItemProps) => {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0">
        {type === 'task' ? (
          <AlertOctagon className="h-5 w-5 text-blue-500" />
        ) : (
          <MessageSquare className="h-5 w-5 text-green-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {description}
        </p>
        <p className="text-sm text-gray-500">
          {format(new Date(date), 'MMM d, yyyy h:mm a')}
        </p>
      </div>
    </div>
  );
};