import { Button } from "@/components/ui/button";

interface EventFormButtonsProps {
  onCancel: () => void;
}

export const EventFormButtons = ({ onCancel }: EventFormButtonsProps) => {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">
        Schedule Event
      </Button>
    </div>
  );
};