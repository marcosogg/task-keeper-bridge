import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TaskFormPriorityProps {
  priority: string;
  onPriorityChange: (value: string) => void;
}

export const TaskFormPriority = ({ priority, onPriorityChange }: TaskFormPriorityProps) => {
  return (
    <div>
      <Label>Priority</Label>
      <RadioGroup
        defaultValue={priority}
        className="flex gap-4 mt-1.5"
        onValueChange={onPriorityChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="low" />
          <Label htmlFor="low" className="text-blue-600">Low</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Label htmlFor="medium" className="text-yellow-600">Medium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="high" />
          <Label htmlFor="high" className="text-red-600">High</Label>
        </div>
      </RadioGroup>
    </div>
  );
};