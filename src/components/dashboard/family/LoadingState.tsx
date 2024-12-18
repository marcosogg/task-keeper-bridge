import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const LoadingState = () => {
  return (
    <Card>
      <CardHeader>
        <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-20 bg-gray-100 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
};