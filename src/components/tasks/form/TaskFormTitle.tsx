import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const TaskFormTitle = () => {
  return (
    <div>
      <Label htmlFor="title">Task Title</Label>
      <Input
        id="title"
        placeholder="Enter task title (e.g., 'Grocery Shopping')"
        className="mt-1.5"
      />
    </div>
  );
};