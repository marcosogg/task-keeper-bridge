import { ActivityItem } from "./ActivityItem";

interface Activity {
  activity_id: string;
  type: string;
  content: Record<string, any>;
  created_at: string;
  profile_name: string;
  profile_avatar_url: string | null;
}

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.activity_id}
          type={activity.type}
          content={activity.content}
          createdAt={activity.created_at}
          profileName={activity.profile_name}
          profileAvatarUrl={activity.profile_avatar_url}
        />
      ))}
    </div>
  );
};