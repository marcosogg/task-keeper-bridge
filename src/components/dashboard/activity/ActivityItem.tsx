import { AlertOctagon, Star, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  type: string;
  date: string;
  profileInitial: string;
  description: string;
}

export const ActivityItem = ({ type, date, profileInitial, description }: ActivityItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
        getPriorityColor(type)
      )}
      role="listitem"
    >
      <div 
        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 text-sm"
        aria-hidden="true"
      >
        {profileInitial}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {getPriorityIcon(type)}
          <p className="text-sm text-gray-900">
            {description}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(date).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const getPriorityIcon = (type: string) => {
  switch (type) {
    case 'task':
      return <AlertOctagon className="h-4 w-4 text-red-500" aria-hidden="true" />;
    case 'message':
      return <Star className="h-4 w-4 text-orange-500" aria-hidden="true" />;
    default:
      return <Flag className="h-4 w-4 text-blue-500" aria-hidden="true" />;
  }
};

const getPriorityColor = (type: string) => {
  switch (type) {
    case 'task':
      return 'bg-red-50 border-red-100';
    case 'message':
      return 'bg-orange-50 border-orange-100';
    default:
      return 'bg-blue-50 border-blue-100';
  }
};