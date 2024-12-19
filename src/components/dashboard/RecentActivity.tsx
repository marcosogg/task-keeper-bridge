import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityList } from "./activity/ActivityList";
import { LoadingState } from "./activity/LoadingState";
import { EmptyState } from "./activity/EmptyState";
import { useAuth } from "@/contexts/AuthContext";
import { ActivityQuery } from "./activity/ActivityQuery";
import { ActivitySubscription } from "./activity/ActivitySubscription";

export const RecentActivity = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ActivitySubscription userId={user.id} />
        <ActivityQuery 
          userId={user.id}
          onError={() => null}
        >
          {({ activities, isLoading }) => {
            if (isLoading) {
              return <LoadingState />;
            }

            if (!activities || activities.length === 0) {
              return <EmptyState />;
            }

            return <ActivityList activities={activities} />;
          }}
        </ActivityQuery>
      </CardContent>
    </Card>
  );
};