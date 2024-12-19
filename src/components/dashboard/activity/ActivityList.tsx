import { ActivityItem } from "./ActivityItem";

interface Activity {
  activity_type: string;
  activity_date: string;
  description: string;
}

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <ActivityItem
          key={`${activity.activity_type}-${index}`}
          type={activity.activity_type}
          date={activity.activity_date}
          description={activity.description}
        />
      ))}
    </div>
  );
};