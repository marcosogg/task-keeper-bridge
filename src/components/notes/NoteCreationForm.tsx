import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "@/lib/validations";
import { NoteFormTitle } from "./form/NoteFormTitle";
import { NoteFormContent } from "./form/NoteFormContent";
import { NoteFormActions } from "./form/NoteFormActions";
import { NoteFormButtons } from "./form/NoteFormButtons";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { z } from "zod";

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteCreationFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const NoteCreationForm = ({ onCancel, onSuccess }: NoteCreationFormProps) => {
  const [isChecklist, setIsChecklist] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
      isChecklist: false,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!user) {
      toast.error("You must be logged in to create notes");
      return;
    }

    setIsSubmitting(true);
    try {
      // First get the user's family_id
      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .single();

      if (familyError) throw familyError;

      const { error } = await supabase.from('notes').insert({
        title: data.title,
        content: data.content,
        is_checklist: isChecklist,
        created_by: user.id,
        family_id: familyMember.family_id
      });

      if (error) throw error;

      toast.success("Note created successfully!");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error("Failed to create note");
    } finally {
      setIsSubmitting(false);
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
      <NoteFormButtons onCancel={onCancel} isSubmitting={isSubmitting} />
    </form>
  );
};