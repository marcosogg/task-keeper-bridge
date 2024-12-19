import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPriorityColor } from "@/utils/styles";
import { cn } from "@/lib/utils";
import type { Priority } from "@/types/common";

interface TaskDetailsHeaderProps {
  title: string;
  priority: string;
  status: string;
}

export const TaskDetailsHeader = ({ title, priority, status }: TaskDetailsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div className="space-y-1">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline"
            className={cn(
              "capitalize",
              getPriorityColor(priority as Priority)
            )}
          >
            {priority}
          </Badge>
          <Badge 
            variant="outline"
            className="capitalize"
          >
            {status}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
};