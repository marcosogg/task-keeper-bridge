import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormRegister, FieldError } from "react-hook-form";

interface EventFormDescriptionProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const EventFormDescription = ({ register, error }: EventFormDescriptionProps) => {
  return (
    <div>
      <Label htmlFor="description" className={error ? "text-destructive" : ""}>
        Description (Optional)
      </Label>
      <Textarea
        id="description"
        {...register("description")}
        placeholder="Add event details..."
        className={`mt-1.5 min-h-[100px] ${error ? "border-destructive" : ""}`}
      />
      {error && (
        <p className="text-sm text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
};