import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { TaskDialog } from "./TaskDialog";
import { CalendarWrapper } from "./CalendarWrapper";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarSkeleton } from "./CalendarSkeleton";
import { toast } from "sonner";
import type { Task } from "@/types/task";

interface TaskCalendarProps {
  tasks: Task[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const TaskCalendar = ({ tasks, isLoading, error }: TaskCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

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

  if (error) {
    console.error('Error fetching tasks:', error);
    toast.error("Failed to load calendar tasks");
    return null;
  }

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  return (
    <Card className="w-full h-full">
      <CalendarHeader onTodayClick={() => setCurrentMonth(new Date())} />
      <CardContent>
        <CalendarWrapper
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          onDateSelect={(date) => date && handleDayClick(date)}
          onMonthChange={setCurrentMonth}
          getDayTasks={getDayTasks}
        />

        <TaskDialog 
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          selectedDate={selectedDate}
          tasks={selectedDate ? getDayTasks(selectedDate) : []}
        />
      </CardContent>
    </Card>
  );
};