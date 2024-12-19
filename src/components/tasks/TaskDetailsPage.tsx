import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getPriorityColor } from "@/utils/styles";
import { cn } from "@/lib/utils";
import type { Priority } from "@/types/common";  // Import the Priority type

export const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      if (!taskId) throw new Error('Task ID is required');

      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          assigned_to_profile:profiles!tasks_assigned_to_fkey (
            full_name,
            email,
            avatar_url
          )
        `)
        .eq('id', taskId)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Task not found');
      
      return data;
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (error) {
    toast.error("Failed to load task details");
    return (
      <div className="p-6">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="text-center text-destructive">
              <p>Error loading task details. Please try again later.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>{task.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline"
                className={cn(
                  "capitalize",
                  getPriorityColor(task.priority as Priority)
                )}
              >
                {task.priority}
              </Badge>
              <Badge 
                variant="outline"
                className="capitalize"
              >
                {task.status}
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
        <CardContent className="space-y-6">
          {task.description && (
            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{task.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Due Date</h3>
              <p className="text-muted-foreground">
                {task.due_date ? format(new Date(task.due_date), 'PPP') : 'No due date'}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Assigned To</h3>
              <p className="text-muted-foreground">
                {task.assigned_to_profile?.full_name || 'Unassigned'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};