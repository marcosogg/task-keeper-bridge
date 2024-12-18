import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const EventFormTitle = () => {
  return (
    <div>
      <Label htmlFor="title">Event Title</Label>
      <Input
        id="title"
        placeholder="Event Title (e.g., 'Family Dinner')"
        className="mt-1.5"
      />
    </div>
  );
};