import { AlertOctagon, Star, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  user: string;
  action: string;
  item: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
}

const activities: ActivityItem[] = [
  { 
    user: "Mom", 
    action: "completed", 
    item: "Grocery Shopping",
    priority: "high" as const,
    timestamp: "2 hours ago"
  },
  { 
    user: "Dad", 
    action: "added", 
    item: "Family Dinner",
    priority: "medium" as const,
    timestamp: "3 hours ago"
  },
  { 
    user: "John", 
    action: "updated", 
    item: "Weekend Plans",
    priority: "low" as const,
    timestamp: "4 hours ago"
  },
].sort((a, b) => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return priorityOrder[a.priority] - priorityOrder[b.priority];
});

const getPriorityIcon = (priority: ActivityItem["priority"]) => {
  switch (priority) {
    case 'high':
      return <AlertOctagon className="h-4 w-4 text-red-500" aria-hidden="true" />;
    case 'medium':
      return <Star className="h-4 w-4 text-orange-500" aria-hidden="true" />;
    case 'low':
      return <Flag className="h-4 w-4 text-blue-500" aria-hidden="true" />;
    default:
      return null;
  }
};

const getPriorityColor = (priority: ActivityItem["priority"]) => {
  switch (priority) {
    case 'high':
      return 'bg-red-50 border-red-100';
    case 'medium':
      return 'bg-orange-50 border-orange-100';
    case 'low':
      return 'bg-blue-50 border-blue-100';
    default:
      return 'bg-gray-50 border-gray-100';
  }
};

export const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm" role="region" aria-label="Recent activity">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4" id="recent-activity-heading">
        Recent Activity
      </h2>
      <div className="space-y-3 md:space-y-4" aria-labelledby="recent-activity-heading">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
              getPriorityColor(activity.priority)
            )}
            role="listitem"
          >
            <div 
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 text-sm"
              aria-hidden="true"
            >
              {activity.user[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {getPriorityIcon(activity.priority)}
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action} {activity.item}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};