import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmptyStateProps {
  onManageFamily: () => void;
}

export const EmptyState = ({ onManageFamily }: EmptyStateProps) => {
  return (
    <Card className="w-full h-full animate-fadeIn" role="region" aria-label="Family insights">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold" id="insights-heading">Family Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
        <Users className="h-12 w-12 text-gray-400" />
        <div className="text-center">
          <h3 className="font-medium text-gray-900">No Family Group</h3>
          <p className="text-sm text-gray-500 mt-1">Join or create a family group to see insights</p>
        </div>
        <Button onClick={onManageFamily} className="mt-4">
          Manage Family
        </Button>
      </CardContent>
    </Card>
  );
};