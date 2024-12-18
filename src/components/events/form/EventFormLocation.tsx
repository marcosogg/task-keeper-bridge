import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldError } from "react-hook-form";

interface EventFormLocationProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const EventFormLocation = ({ register, error }: EventFormLocationProps) => {
  return (
    <div>
      <Label htmlFor="location" className={error ? "text-destructive" : ""}>
        Location
      </Label>
      <Input
        id="location"
        {...register("location")}
        placeholder="Location (e.g., 'Restaurant Name or address')"
        className={`mt-1.5 ${error ? "border-destructive" : ""}`}
      />
      {error && (
        <p className="text-sm text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
};