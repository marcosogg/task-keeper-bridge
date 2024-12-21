import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskFiltersProps {
  onFilterChange: (filter: 'all' | 'assigned' | 'created' | 'completed') => void;
  onSortChange: (sort: 'date' | 'priority' | 'created') => void;
  activeFilter: 'all' | 'assigned' | 'created' | 'completed';
  activeSort: 'date' | 'priority' | 'created';
}

export const TaskFilters = ({ 
  onFilterChange,
  onSortChange,
  activeFilter,
  activeSort
}: TaskFiltersProps) => {

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeFilter === "all" ? "secondary" : "ghost"}
            className="font-medium"
            onClick={() => onFilterChange('all')}
          >
            All Tasks
          </Button>
          <Button
            variant={activeFilter === "assigned" ? "secondary" : "ghost"}
            className="font-medium"
            onClick={() => onFilterChange('assigned')}
          >
            Assigned to Me
          </Button>
          <Button
            variant={activeFilter === "created" ? "secondary" : "ghost"}
            className="font-medium"
             onClick={() => onFilterChange('created')}
          >
            Created by Me
          </Button>
          <Button
             variant={activeFilter === "completed" ? "secondary" : "ghost"}
            className="font-medium"
            onClick={() => onFilterChange('completed')}
          >
            Completed
          </Button>
        </div>
        <div className="flex gap-2 md:ml-auto">
          <Select 
             defaultValue={activeSort}
            onValueChange={(value) => onSortChange(value as 'date' | 'priority' | 'created')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="created">Creation Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
