import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { TaskDialog } from "./calendar/TaskDialog";
import { fetchTasks } from "@/utils/mockData";
import { getPriorityColor } from "@/utils/styles";
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
    return tasks.filter(task => 
      format(parseISO(task.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const modifiers = {
    hasTask: (date: Date) => getDayTasks(date).length > 0,
    today: (date: Date) => format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
  };

  const modifiersStyles = {
    hasTask: { border: '2px solid transparent' },
    today: { border: '2px solid var(--primary)' },
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
        <div className="[&_.rdp]:w-full [&_.rdp-table]:w-full [&_.rdp-caption]:w-full [&_.rdp-cell]:w-[14.28%] [&_.rdp-head_th]:w-[14.28%]">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && handleDayClick(date)}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border"
            components={{
              DayContent: ({ date }) => {
                const dayTasks = getDayTasks(date);
                return (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div 
                        className="w-full h-full flex flex-col items-center justify-center"
                        role="button"
                        tabIndex={0}
                      >
                        <span>{format(date, 'd')}</span>
                        {dayTasks.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {dayTasks.slice(0, 3).map((task) => (
                              <div
                                key={task.id}
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full",
                                  getPriorityColor(task.priority)
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64">
                      <div className="space-y-2">
                        <p className="font-semibold">{format(date, 'MMMM d, yyyy')}</p>
                        <p className="text-sm text-muted-foreground">
                          {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''} scheduled
                        </p>
                        {dayTasks.length > 0 && (
                          <ul className="text-sm space-y-1">
                            {dayTasks.map(task => (
                              <li key={task.id} className="flex items-center gap-2">
                                <div 
                                  className={cn(
                                    "w-2 h-2 rounded-full",
                                    getPriorityColor(task.priority)
                                  )}
                                />
                                {task.title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                );
              },
            }}
          />
        </div>

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