import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { TasksContent } from "@/components/tasks/TasksContent";

const Tasks = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <TasksContent />
      </div>
    </div>
  );
};

export default Tasks;