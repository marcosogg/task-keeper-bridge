import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldError } from "react-hook-form";

interface NoteFormTitleProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const NoteFormTitle = ({ register, error }: NoteFormTitleProps) => {
  return (
    <div>
      <Label htmlFor="title" className={error ? "text-destructive" : ""}>
        Note Title (Optional)
      </Label>
      <Input
        id="title"
        {...register("title")}
        placeholder="Note title (e.g., 'Grocery List')"
        className={`mt-1.5 ${error ? "border-destructive" : ""}`}
      />
      {error && (
        <p className="text-sm text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
};