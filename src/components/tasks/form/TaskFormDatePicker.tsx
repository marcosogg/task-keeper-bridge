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
}

export const TaskFormDatePicker = ({ date, onDateChange }: TaskFormDatePickerProps) => {
  return (
    <div>
      <Label>Due Date (Optional)</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full mt-1.5 justify-start text-left font-normal",
              !date && "text-muted-foreground"
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
              onDateChange(newDate || undefined);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};