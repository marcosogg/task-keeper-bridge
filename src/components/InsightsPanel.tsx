import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightsList } from "./dashboard/insights/InsightsList";
import { usePriorityItems } from "@/hooks/queries/usePriorityItems";
import { LoadingState } from "./dashboard/insights/LoadingState";
import { EmptyState } from "./dashboard/insights/EmptyState";

export const InsightsPanel = () => {
  const { data: items, isLoading } = usePriorityItems();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your TAZQs</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingState />
        ) : !items?.length ? (
          <EmptyState />
        ) : (
          <InsightsList items={items} onActionClick={() => {}} />
        )}
      </CardContent>
    </Card>
  );
};