import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskFormDatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  error?: { message?: string };
}

export const TaskFormDatePicker = ({ date, onDateChange, error }: TaskFormDatePickerProps) => {
  return (
    <div>
      <Label>Due Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full mt-1.5 justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-destructive"
            )}
            type="button"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                // Set time to end of day (23:59:59) for due dates
                const endOfDay = new Date(newDate);
                endOfDay.setHours(23, 59, 59, 999);
                onDateChange(endOfDay);
              } else {
                onDateChange(undefined);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm font-medium text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
};