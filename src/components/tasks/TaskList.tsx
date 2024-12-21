import { useTasks } from "@/hooks/queries/useTasks";
import { TaskCard } from "./TaskCard";
import { LoadingState } from "../ui/loading-state";
import { EmptyState } from "../ui/empty-state";
import { ClipboardList } from "lucide-react";

interface TaskListProps {
    filter: 'all' | 'assigned' | 'created' | 'completed';
    sort: 'date' | 'priority' | 'created';
    isModalView?: boolean
}

export const TaskList = ({ filter, sort, isModalView = true }: TaskListProps) => {
  const { data: tasks, isLoading, error } = useTasks(filter, sort);

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        console.error('Error fetching tasks:', error);
        return <p>Failed to load tasks.</p>;
    }

    if (!tasks || tasks.length === 0) {
        return <EmptyState 
          icon={ClipboardList}
          title="No Tasks"
          description="There are no tasks to display."
        />;
    }

  return (
      <div className="mt-4 space-y-4">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} isModalView={isModalView} />
        ))}
      </div>
  );
};
