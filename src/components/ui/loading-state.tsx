import { Loader2 } from "lucide-react";
import { Card } from "./card";
import { CardContent } from "./card";

export const LoadingState = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};
