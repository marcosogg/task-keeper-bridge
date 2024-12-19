import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/validations";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TaskFormTitle } from "./form/TaskFormTitle";
import { TaskFormDescription } from "./form/TaskFormDescription";
import { TaskFormPriority } from "./form/TaskFormPriority";
import { TaskFormDatePicker } from "./form/TaskFormDatePicker";
import { TaskFormActions } from "./form/TaskFormActions";
import { TaskFormButtons } from "./form/TaskFormButtons";
import type { Task } from "@/types/task";
import { useFamilyMembers } from "@/hooks/queries/useFamilyMembers";
import { useTaskMutations } from "@/hooks/useTaskMutations";

interface TaskCreationFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  editMode?: boolean;
  initialData?: Task;
}

export const TaskCreationForm = ({ 
  onCancel, 
  onSuccess, 
  editMode = false,
  initialData 
}: TaskCreationFormProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: familyMembers } = useFamilyMembers();
  const { invalidateTaskQueries } = useTaskMutations();

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: editMode && initialData ? {
      title: initialData.title,
      description: initialData.description || "",
      priority: initialData.priority,
      dueDate: initialData.due_date,
      assignedTo: initialData.assigned_to ? [initialData.assigned_to] : [],
      status: initialData.status,
    } : {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      assignedTo: [],
      status: "todo",
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (!user) throw new Error("User not authenticated");
      
      // Get the user's family_id
      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (familyError) throw familyError;
      if (!familyMember) throw new Error("No family found");

      const taskData = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        due_date: data.dueDate,
        assigned_to: data.assignedTo?.[0],
        family_id: familyMember.family_id,
        created_by: user.id,
        status: data.status,
      };

      if (editMode && initialData) {
        const { error } = await supabase
          .from('tasks')
          .update(taskData)
          .eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('tasks')
          .insert([taskData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editMode ? "Task updated successfully" : "Task created successfully");
      invalidateTaskQueries();
      if (editMode) {
        queryClient.invalidateQueries({ queryKey: ['task', initialData?.id] });
      }
      onSuccess();
      form.reset();
    },
    onError: (error) => {
      console.error('Error saving task:', error);
      toast.error(editMode ? "Failed to update task" : "Failed to create task");
    }
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('Form data being submitted:', data);
    mutation.mutate(data);
  });

  console.log('Form state:', {
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <TaskFormTitle register={form.register} error={form.formState.errors.title} />
      <TaskFormDescription register={form.register} error={form.formState.errors.description} />
      <TaskFormPriority 
        priority={form.watch("priority")} 
        onPriorityChange={(value) => form.setValue("priority", value)} 
      />
      <TaskFormDatePicker
        date={form.watch("dueDate") ? new Date(form.watch("dueDate")) : undefined}
        onDateChange={(date) => form.setValue("dueDate", date?.toISOString() || "")}
        error={form.formState.errors.dueDate}
      />
      <TaskFormActions
        assignees={form.watch("assignedTo")}
        onAssigneesChange={(assignees) => form.setValue("assignedTo", assignees)}
        availableAssignees={familyMembers || []}
      />
      <TaskFormButtons 
        onCancel={onCancel} 
        isSubmitting={mutation.isPending}
        submitLabel={editMode ? "Update Task" : "Create Task"}
      />
    </form>
  );
};