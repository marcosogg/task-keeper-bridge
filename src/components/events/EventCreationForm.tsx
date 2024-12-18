import { useState } from "react";
import { toast } from "sonner";
import { EventFormTitle } from "./form/EventFormTitle";
import { EventFormDescription } from "./form/EventFormDescription";
import { EventFormDateTime } from "./form/EventFormDateTime";
import { EventFormLocation } from "./form/EventFormLocation";
import { EventFormActions } from "./form/EventFormActions";
import { EventFormButtons } from "./form/EventFormButtons";

interface EventCreationFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const EventCreationForm = ({ onCancel, onSuccess }: EventCreationFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Event scheduled successfully!");
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
        <EventFormTitle />
        <EventFormDescription />
        <EventFormDateTime 
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <EventFormLocation />
        <EventFormActions />
      </div>
      <EventFormButtons onCancel={handleCancel} />
    </form>
  );
};