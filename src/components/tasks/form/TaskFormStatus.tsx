// src/components/tasks/form/TaskFormStatus.tsx
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFormStatusProps {
    status: 'todo' | 'in_progress' | 'completed' | 'cancelled'
    onStatusChange: (value:  'todo' | 'in_progress' | 'completed' | 'cancelled') => void;
}

export const TaskFormStatus = ({ status, onStatusChange }: TaskFormStatusProps) => {
  return (
    <div>
      <Label>Status</Label>
      <Select 
        onValueChange={onStatusChange}
        defaultValue={status}
      >
        <SelectTrigger className="w-full mt-1.5">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
