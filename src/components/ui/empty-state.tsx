import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description: string;
}

export const EmptyState = ({ icon: Icon, title, description }: EmptyStateProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          {Icon && <Icon className="h-12 w-12 text-gray-400 mb-4" />}
          {title && <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>}
          <p className="text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
