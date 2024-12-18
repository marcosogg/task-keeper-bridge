import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const TaskFormDescription = () => {
  return (
    <div>
      <Label htmlFor="description">Description (Optional)</Label>
      <Textarea
        id="description"
        placeholder="Add a description of the task..."
        className="mt-1.5 min-h-[100px]"
      />
    </div>
  );
};