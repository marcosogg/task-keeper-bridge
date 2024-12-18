import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "@/lib/validations";
import { NoteFormTitle } from "./form/NoteFormTitle";
import { NoteFormContent } from "./form/NoteFormContent";
import { NoteFormActions } from "./form/NoteFormActions";
import { NoteFormButtons } from "./form/NoteFormButtons";
import type { z } from "zod";

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteCreationFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const NoteCreationForm = ({ onCancel, onSuccess }: NoteCreationFormProps) => {
  const [isChecklist, setIsChecklist] = useState(false);

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
      isChecklist: false,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log("Form data:", data);
    toast.success("Note created successfully!");
    if (onSuccess) {
      onSuccess();
    }
  });

  const handleChecklistChange = (value: boolean) => {
    setIsChecklist(value);
    form.setValue("isChecklist", value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <NoteFormTitle 
          register={form.register}
          error={form.formState.errors.title}
        />
        <NoteFormContent 
          register={form.register}
          error={form.formState.errors.content}
          isChecklist={isChecklist} 
        />
        <NoteFormActions 
          isChecklist={isChecklist} 
          onChecklistChange={handleChecklistChange}
        />
      </div>
      <NoteFormButtons onCancel={onCancel} />
    </form>
  );
};