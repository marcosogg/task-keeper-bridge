import { useState } from "react";
import { toast } from "sonner";
import { NoteFormTitle } from "./form/NoteFormTitle";
import { NoteFormContent } from "./form/NoteFormContent";
import { NoteFormActions } from "./form/NoteFormActions";
import { NoteFormButtons } from "./form/NoteFormButtons";

interface NoteCreationFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const NoteCreationForm = ({ onCancel, onSuccess }: NoteCreationFormProps) => {
  const [isChecklist, setIsChecklist] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Note created successfully!");
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
        <NoteFormTitle />
        <NoteFormContent isChecklist={isChecklist} />
        <NoteFormActions isChecklist={isChecklist} onChecklistChange={setIsChecklist} />
      </div>
      <NoteFormButtons onCancel={handleCancel} />
    </form>
  );
};