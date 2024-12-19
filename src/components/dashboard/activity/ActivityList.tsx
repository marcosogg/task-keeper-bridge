import { ActivityItem } from "./ActivityItem";

interface ActivityItem {
  activity_type: string;
  activity_date: string;
  profile_id: string;
  description: string;
}

interface ActivityListProps {
  activities: ActivityItem[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <div className="space-y-3 md:space-y-4" aria-labelledby="recent-activity-heading">
      {activities.map((activity, index) => (
        <ActivityItem
          key={`${activity.profile_id}-${index}`}
          type={activity.activity_type}
          date={activity.activity_date}
          profileInitial={activity.profile_id[0]}
          description={activity.description}
        />
      ))}
    </div>
  );
};