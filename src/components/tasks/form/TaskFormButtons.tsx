import { Button } from "@/components/ui/button";

interface TaskFormButtonsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export const TaskFormButtons = ({ 
  onCancel, 
  isSubmitting,
  submitLabel = "Create Task"
}: TaskFormButtonsProps) => {
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
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </div>
  );
};