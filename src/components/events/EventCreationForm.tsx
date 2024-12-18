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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { z } from "zod";

type EventFormValues = z.infer<typeof eventSchema>;

interface EventCreationFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const EventCreationForm = ({ onCancel, onSuccess }: EventCreationFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!user) {
      toast.error("You must be logged in to create events");
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

      const { error } = await supabase
        .from('events')
        .insert({
          title: data.title,
          description: data.description,
          start_date: startDate?.toISOString(),
          end_date: endDate?.toISOString(),
          location: data.location,
          created_by: user.id,
          family_id: familyMember.family_id
        });

      if (error) throw error;

      toast.success("Event scheduled successfully!");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error("Failed to schedule event");
    } finally {
      setIsSubmitting(false);
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
      <EventFormButtons onCancel={onCancel} isSubmitting={isSubmitting} />
    </form>
  );
};