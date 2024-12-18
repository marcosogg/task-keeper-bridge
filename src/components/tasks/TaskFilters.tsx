import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const TaskFilters = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" className="font-medium">All Tasks</Button>
          <Button variant="ghost" className="font-medium">Assigned to Me</Button>
          <Button variant="ghost" className="font-medium">Created by Me</Button>
          <Button variant="ghost" className="font-medium">Completed</Button>
        </div>
        <div className="flex gap-2 md:ml-auto">
          <Select defaultValue="date">
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