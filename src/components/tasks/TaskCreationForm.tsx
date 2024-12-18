import { useState } from "react";
import { toast } from "sonner";
import { TaskFormTitle } from "./form/TaskFormTitle";
import { TaskFormDescription } from "./form/TaskFormDescription";
import { TaskFormDatePicker } from "./form/TaskFormDatePicker";
import { TaskFormPriority } from "./form/TaskFormPriority";
import { TaskFormActions } from "./form/TaskFormActions";
import { TaskFormButtons } from "./form/TaskFormButtons";

interface TaskCreationFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const TaskCreationForm = ({ onCancel, onSuccess }: TaskCreationFormProps) => {
  const [date, setDate] = useState<Date>();
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Task created successfully!");
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <TaskFormTitle />
        <TaskFormDescription />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TaskFormDatePicker date={date} onDateChange={setDate} />
          <TaskFormPriority priority={priority} onPriorityChange={setPriority} />
        </div>

        <TaskFormActions />
      </div>

      <TaskFormButtons onCancel={handleCancel} />
    </form>
  );
};