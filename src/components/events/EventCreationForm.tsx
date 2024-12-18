import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/lib/validations";
import { EventFormTitle } from "./form/EventFormTitle";
import { EventFormDescription } from "./form/EventFormDescription";
import { EventFormDateTime } from "./form/EventFormDateTime";
import { EventFormLocation } from "./form/EventFormLocation";
import { EventFormActions } from "./form/EventFormActions";
import { EventFormButtons } from "./form/EventFormButtons";
import type { z } from "zod";

type EventFormValues = z.infer<typeof eventSchema>;

interface EventCreationFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const EventCreationForm = ({ onCancel, onSuccess }: EventCreationFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log("Form data:", data);
    toast.success("Event scheduled successfully!");
    if (onSuccess) {
      onSuccess();
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <EventFormTitle 
          register={form.register} 
          error={form.formState.errors.title}
        />
        <EventFormDescription 
          register={form.register}
          error={form.formState.errors.description}
        />
        <EventFormDateTime 
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => {
            setStartDate(date);
            form.setValue("startDate", date?.toISOString() || "");
          }}
          onEndDateChange={(date) => {
            setEndDate(date);
            form.setValue("endDate", date?.toISOString() || "");
          }}
          error={form.formState.errors.startDate}
        />
        <EventFormLocation 
          register={form.register}
          error={form.formState.errors.location}
        />
        <EventFormActions />
      </div>
      <EventFormButtons onCancel={onCancel} />
    </form>
  );
};