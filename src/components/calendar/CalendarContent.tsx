import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { TaskDialog } from "./TaskDialog";
import { CalendarWrapper } from "./CalendarWrapper";
import { CalendarHeader } from "./CalendarHeader";
import { useCalendarTasks } from "./hooks/useCalendarTasks";

type CalendarView = "month" | "week" | "day";

export const CalendarContent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>("month");

  const { data: tasks, isLoading } = useCalendarTasks(view, currentMonth);

  const getDayTasks = (date: Date) => {
    if (!tasks) return [];
    return tasks.filter(task => {
      try {
        if (!task.due_date) return false;
        return format(parseISO(task.due_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      } catch (e) {
        console.error('Error parsing date:', e);
        return false;
      }
    });
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Card className="w-full h-full animate-pulse m-6">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-32" />
        </CardHeader>
        <CardContent>
          <div className="h-[600px] bg-gray-100 rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex-1 p-6">
      <Card className="w-full h-full">
        <CardHeader>
          <CalendarHeader 
            view={view}
            setView={setView}
            setCurrentMonth={setCurrentMonth}
          />
        </CardHeader>
        <CardContent>
          <CalendarWrapper
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            onDateSelect={(date) => date && handleDayClick(date)}
            onMonthChange={setCurrentMonth}
            getDayTasks={getDayTasks}
            view={view}
          />

          <TaskDialog 
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            selectedDate={selectedDate}
            tasks={selectedDate ? getDayTasks(selectedDate) : []}
          />
        </CardContent>
      </Card>
    </div>
  );
};