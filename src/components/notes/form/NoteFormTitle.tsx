import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const NoteFormTitle = () => {
  return (
    <div>
      <Label htmlFor="title">Note Title (Optional)</Label>
      <Input
        id="title"
        placeholder="Note title (e.g., 'Grocery List')"
        className="mt-1.5"
      />
    </div>
  );
};