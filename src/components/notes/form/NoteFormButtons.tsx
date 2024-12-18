import { Button } from "@/components/ui/button";

interface NoteFormButtonsProps {
  onCancel: () => void;
}

export const NoteFormButtons = ({ onCancel }: NoteFormButtonsProps) => {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">
        Save Note
      </Button>
    </div>
  );
};