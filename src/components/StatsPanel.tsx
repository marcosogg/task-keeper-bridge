import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  date: Date;
  priority: 'high' | 'medium' | 'low';
}

// Mock data for demonstration
const mockTasks: Task[] = [
  { id: '1', title: 'Family Dinner', date: new Date(), priority: 'high' },
  { id: '2', title: 'Soccer Practice', date: new Date(Date.now() + 86400000), priority: 'medium' },
  { id: '3', title: 'Grocery Shopping', date: new Date(), priority: 'low' },
];

const fetchTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockTasks;
};

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-blue-500';
    default:
      return '';
  }
};

export const StatsPanel = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const getDayTasks = (date: Date) => {
    return tasks?.filter(task => 
      format(new Date(task.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    ) || [];
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

  return (
    <Card className="w-full h-full flex flex-col animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
        <CardTitle className="text-xl font-semibold">Calendar</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCurrentMonth(new Date())}
        >
          Today
        </Button>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="h-full flex flex-col">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && handleDayClick(date)}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border flex-grow w-full"
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
                            {dayTasks.slice(0, 3).map((task, index) => (
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Tasks for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedDate && getDayTasks(selectedDate).map(task => (
                <div 
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg border"
                >
                  <div 
                    className={cn(
                      "w-3 h-3 rounded-full",
                      getPriorityColor(task.priority)
                    )}
                  />
                  <span>{task.title}</span>
                </div>
              ))}
              {selectedDate && getDayTasks(selectedDate).length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No tasks scheduled for this day
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
