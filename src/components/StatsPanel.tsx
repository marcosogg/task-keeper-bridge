import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { TaskDialog } from "./calendar/TaskDialog";
import { CalendarWrapper } from "./calendar/CalendarWrapper";
import { fetchTasks } from "@/utils/mockData";
import type { Task } from "@/types/task";

export const StatsPanel = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const getDayTasks = (date: Date) => {
    if (!tasks) return [];
    return tasks.filter(task => {
      try {
        if (!task.dueDate) return false;
        return format(parseISO(task.dueDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
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
      <Card className="w-full h-full animate-pulse">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-100 rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Calendar</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCurrentMonth(new Date())}
        >
          Today
        </Button>
      </CardHeader>
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