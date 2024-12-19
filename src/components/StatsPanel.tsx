import { useStatsPanel } from "@/hooks/useStatsPanel";
import { TaskCalendar } from "./calendar/TaskCalendar";

export const StatsPanel = () => {
  const { tasks, isLoading, error } = useStatsPanel();

  return (
    <TaskCalendar
      tasks={tasks}
      isLoading={isLoading}
      error={error}
    />
  );
};