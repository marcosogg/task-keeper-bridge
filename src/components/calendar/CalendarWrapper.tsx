import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarDayContent } from "./CalendarDayContent";
import type { Task } from "@/types/task";

interface CalendarWrapperProps {
  selectedDate: Date | undefined;
  currentMonth: Date;
  onDateSelect: (date: Date | undefined) => void;
  onMonthChange: (date: Date) => void;
  getDayTasks: (date: Date) => Task[];
}

export const CalendarWrapper = ({
  selectedDate,
  currentMonth,
  onDateSelect,
  onMonthChange,
  getDayTasks,
}: CalendarWrapperProps) => {
  const modifiers = {
    hasTask: (date: Date) => getDayTasks(date).length > 0,
    today: (date: Date) => format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
  };

  const modifiersStyles = {
    hasTask: { border: '2px solid transparent' },
    today: { border: '2px solid var(--primary)' },
  };

  return (
    <div className="[&_.rdp]:w-full [&_.rdp-table]:w-full [&_.rdp-caption]:w-full [&_.rdp-cell]:w-[14.28%] [&_.rdp-head_th]:w-[14.28%]">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        month={currentMonth}
        onMonthChange={onMonthChange}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="rounded-md border"
        components={{
          DayContent: ({ date }) => (
            <CalendarDayContent
              date={date}
              tasks={getDayTasks(date)}
            />
          ),
        }}
      />
    </div>
  );
};