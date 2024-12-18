import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormRegister, FieldError } from "react-hook-form";

interface NoteFormContentProps {
  register: UseFormRegister<any>;
  error?: FieldError;
  isChecklist: boolean;
}

export const NoteFormContent = ({ register, error, isChecklist }: NoteFormContentProps) => {
  return (
    <div>
      <Label htmlFor="content" className={error ? "text-destructive" : ""}>
        Note Content
      </Label>
      <Textarea
        id="content"
        {...register("content")}
        placeholder={isChecklist ? "Enter items, one per line" : "Start typing your note here..."}
        className={`mt-1.5 min-h-[200px] ${error ? "border-destructive" : ""}`}
      />
      {error && (
        <p className="text-sm text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
};