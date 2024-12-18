import { TaskFilters } from "./TaskFilters";
import { TaskList } from "./TaskList";
import { CreateTazqButton } from "@/components/CreateTazqButton";

export const TasksContent = () => {
  return (
    <main className="flex-1 bg-gray-50 p-4 md:p-6" role="main" aria-label="Tasks main content">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Family Tasks</h1>
          <CreateTazqButton variant="default" />
        </div>
        <TaskFilters />
        <TaskList />
      </div>
    </main>
  );
};