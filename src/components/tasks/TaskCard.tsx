// src/components/tasks/TaskCard.tsx
import { Task } from "@/types/task";
import { CheckCircle, Circle, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getPriorityColor } from "@/utils/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTaskMutations } from "@/hooks/useTaskMutations";
import { supabase } from "@/integrations/supabase/client";
import { ViewTaskModal } from "./ViewTaskModal";

interface TaskCardProps {
    task: Task;
    isModalView?: boolean;
}

export const TaskCard = ({ task, isModalView }: TaskCardProps) => {
  const navigate = useNavigate();
  const { invalidateTaskQueries } = useTaskMutations();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);

    const handleEditTask = () => {
        setEditModalOpen(true);
    };

    const handleDeleteTask = () => {
        setDeleteModalOpen(true);
    };

  const handleTaskClick = () => {
    if (isModalView) {
        setDetailsModalOpen(true)
    } else {
      navigate(`/tasks/${task.id}`);
    }
  };


    const handleStatusChange = async (status: Task['status']) => {
        try {
            await supabase
                .from('tasks')
                .update({
                    status,
                    completed_at: status === 'completed' ? new Date().toISOString() : null
                })
                .eq('id', task.id)
               
            invalidateTaskQueries(task.id);
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-white" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
       case 'cancelled':
         return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };


  return (
    <>
      <div
        onClick={handleTaskClick}
        className="flex items-center justify-between p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-4">
            <div className={cn(
              "w-4 h-4 rounded-full",
              task.status === "completed" ? "bg-green-500" : getPriorityColor(task.priority),
            )}>
                {getStatusIcon()}
            </div>
            <div className="space-y-1">
                <h4 className="font-medium">{task.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {task.due_date && (
                        <span>
                        {new Date(task.due_date).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize"
            >
              {task.status === "todo" ? "To Do" :
                task.status === "in_progress" ? "In Progress" :
                  task.status === "completed" ? "Completed" : "Cancelled"}
            </Badge>
          <Select
              defaultValue={task.status}
              onValueChange={(value) => handleStatusChange(value as Task['status'])}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleEditTask}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={handleDeleteTask}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
      </div>
        <ViewTaskModal
            open={detailsModalOpen}
            onOpenChange={setDetailsModalOpen}
            task={task}
        />
      <EditTaskModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          task={task}
      />
       <DeleteTaskDialog
          open={deleteModalOpen}
           onOpenChange={setDeleteModalOpen}
           taskId={task.id}
       />
    </>
  );
};
