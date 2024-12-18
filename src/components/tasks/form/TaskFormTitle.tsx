import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldError } from "react-hook-form";

interface TaskFormTitleProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const TaskFormTitle = ({ register, error }: TaskFormTitleProps) => {
  return (
    <div>
      <Label htmlFor="title" className={error ? "text-destructive" : ""}>
        Task Title
      </Label>
      <Input
        id="title"
        {...register("title")}
        placeholder="Enter task title (e.g., 'Grocery Shopping')"
        className={`mt-1.5 ${error ? "border-destructive" : ""}`}
      />
      {error && (
        <p className="text-sm text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
};