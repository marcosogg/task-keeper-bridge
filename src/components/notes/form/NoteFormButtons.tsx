import { Button } from "@/components/ui/button";

interface NoteFormButtonsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const NoteFormButtons = ({ onCancel, isSubmitting }: NoteFormButtonsProps) => {
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
        {isSubmitting ? "Saving..." : "Save Note"}
      </Button>
    </div>
  );
};