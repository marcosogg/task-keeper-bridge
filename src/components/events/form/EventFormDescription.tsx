import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const EventFormDescription = () => {
  return (
    <div>
      <Label htmlFor="description">Description (Optional)</Label>
      <Textarea
        id="description"
        placeholder="Add event details..."
        className="mt-1.5 min-h-[100px]"
      />
    </div>
  );
};