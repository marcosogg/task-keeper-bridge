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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { z } from "zod";

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskCreationFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const TaskCreationForm = ({ onCancel, onSuccess }: TaskCreationFormProps) => {
  const [date, setDate] = useState<Date>();
  const [priority, setPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!user) {
      toast.error("You must be logged in to create tasks");
      return;
    }

    setIsSubmitting(true);
    try {
      // First get the user's family_id using maybeSingle()
      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (familyError) throw familyError;
      
      if (!familyMember) {
        toast.error("You need to be part of a family to create tasks");
        return;
      }

      const { error } = await supabase.from('tasks').insert({
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        due_date: date?.toISOString(),
        created_by: user.id,
        family_id: familyMember.family_id
      });

      if (error) throw error;

      toast.success("Task created successfully!");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error("Failed to create task");
    } finally {
      setIsSubmitting(false);
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

      <TaskFormButtons onCancel={onCancel} isSubmitting={isSubmitting} />
    </form>
  );
};