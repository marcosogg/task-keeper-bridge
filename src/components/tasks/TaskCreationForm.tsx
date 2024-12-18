import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/validations";
import { TaskFormTitle } from "./form/TaskFormTitle";
import { TaskFormDescription } from "./form/TaskFormDescription";
import { TaskFormDatePicker } from "./form/TaskFormDatePicker";
import { TaskFormPriority } from "./form/TaskFormPriority";
import { TaskFormActions } from "./form/TaskFormActions";
import { TaskFormButtons } from "./form/TaskFormButtons";
import type { z } from "zod";

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskCreationFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const TaskCreationForm = ({ onCancel, onSuccess }: TaskCreationFormProps) => {
  const [date, setDate] = useState<Date>();
  const [priority, setPriority] = useState("medium");

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log("Form data:", data);
    toast.success("Task created successfully!");
    if (onSuccess) {
      onSuccess();
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <TaskFormTitle 
          register={form.register} 
          error={form.formState.errors.title}
        />
        <TaskFormDescription 
          register={form.register}
          error={form.formState.errors.description}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TaskFormDatePicker 
            date={date} 
            onDateChange={(newDate) => {
              setDate(newDate);
              form.setValue("dueDate", newDate?.toISOString());
            }}
          />
          <TaskFormPriority 
            priority={priority} 
            onPriorityChange={(newPriority) => {
              setPriority(newPriority);
              form.setValue("priority", newPriority as "low" | "medium" | "high");
            }}
          />
        </div>

        <TaskFormActions />
      </div>

      <TaskFormButtons onCancel={onCancel} />
    </form>
  );
};