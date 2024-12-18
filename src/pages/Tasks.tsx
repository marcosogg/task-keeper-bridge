import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { TasksContent } from "@/components/tasks/TasksContent";
import { Footer } from "@/components/Footer";

const Tasks = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <TasksContent />
      </div>
      <Footer />
    </div>
  );
};

export default Tasks;