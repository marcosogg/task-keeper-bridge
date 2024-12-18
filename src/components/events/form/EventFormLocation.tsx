import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const EventFormLocation = () => {
  return (
    <div>
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        placeholder="Location (e.g., 'Restaurant Name or address')"
        className="mt-1.5"
      />
    </div>
  );
};