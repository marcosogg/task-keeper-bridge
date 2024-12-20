import { TaskFilters } from "./TaskFilters";
import { TaskList } from "./TaskList";
import { CreateTazqButton } from "@/components/CreateTazqButton";
import { useState } from "react";

export const TasksContent = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'assigned' | 'created' | 'completed'>('all');
    const [activeSort, setActiveSort] = useState<'date' | 'priority' | 'created'>('date');
    const isModalView = true;

  return (
    <main className="flex-1 bg-gray-50 p-4 md:p-6" role="main" aria-label="Tasks main content">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">TAZQ</h1>
          <CreateTazqButton variant="default" />
        </div>
        
        <TaskFilters 
             activeFilter={activeFilter}
             activeSort={activeSort}
             onFilterChange={setActiveFilter}
             onSortChange={setActiveSort}
         />
         <TaskList filter={activeFilter} sort={activeSort} isModalView={isModalView}/>
      </div>
    </main>
  );
};
