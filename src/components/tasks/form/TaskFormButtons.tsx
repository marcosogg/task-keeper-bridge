import { Button } from "@/components/ui/button";

interface TaskFormButtonsProps {
  onCancel: () => void;
}

export const TaskFormButtons = ({ onCancel }: TaskFormButtonsProps) => {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">
        Create Task
      </Button>
    </div>
  );
};