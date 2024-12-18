import { Button } from "@/components/ui/button";

interface TaskFormButtonsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const TaskFormButtons = ({ onCancel, isSubmitting }: TaskFormButtonsProps) => {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t">
      <Button 
        variant="outline" 
        type="button" 
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Task"}
      </Button>
    </div>
  );
};