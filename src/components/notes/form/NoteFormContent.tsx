import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NoteFormContentProps {
  isChecklist: boolean;
}

export const NoteFormContent = ({ isChecklist }: NoteFormContentProps) => {
  return (
    <div>
      <Label htmlFor="content">Note Content</Label>
      <Textarea
        id="content"
        placeholder={isChecklist ? "Enter items, one per line" : "Start typing your note here..."}
        className="mt-1.5 min-h-[200px]"
      />
    </div>
  );
};