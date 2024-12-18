import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldError } from "react-hook-form";

interface EventFormTitleProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const EventFormTitle = ({ register, error }: EventFormTitleProps) => {
  return (
    <div>
      <Label htmlFor="title" className={error ? "text-destructive" : ""}>
        Event Title
      </Label>
      <Input
        id="title"
        {...register("title")}
        placeholder="Event Title (e.g., 'Family Dinner')"
        className={`mt-1.5 ${error ? "border-destructive" : ""}`}
      />
      {error && (
        <p className="text-sm text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
};