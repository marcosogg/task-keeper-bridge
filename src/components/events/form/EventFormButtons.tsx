import { Button } from "@/components/ui/button";

interface EventFormButtonsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const EventFormButtons = ({ onCancel, isSubmitting }: EventFormButtonsProps) => {
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
        {isSubmitting ? "Scheduling..." : "Schedule Event"}
      </Button>
    </div>
  );
};