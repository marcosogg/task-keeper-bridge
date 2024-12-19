import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { TaskDialog } from "./TaskDialog";
import { CalendarWrapper } from "./CalendarWrapper";
import { CreateTazqButton } from "../CreateTazqButton";
import { Calendar, List, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Task } from "@/types/task";

type CalendarView = "month" | "week" | "day";

export const CalendarContent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>("month");
  const { user } = useAuth();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      // First get the user's family_id
      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .single();

      if (familyError) throw familyError;

      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          assigned_to:profiles!tasks_assigned_to_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq('family_id', familyMember.family_id);

      if (error) throw error;
      
      // Ensure the data matches our Task type
      return (data as any[]).map(task => ({
        ...task,
        status: task.status as Task['status'],
        priority: task.priority as Task['priority']
      })) as Task[];
    },
    enabled: !!user
  });

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
          <CardTitle>Calendar</CardTitle>
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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-4">
            <CardTitle className="text-xl font-semibold">Calendar</CardTitle>
            <div className="flex items-center gap-2 ml-4">
              <Button 
                variant={view === "month" ? "default" : "outline"} 
                size="sm"
                onClick={() => setView("month")}
              >
                <Calendar className="h-4 w-4 mr-1" />
                Month
              </Button>
              <Button 
                variant={view === "week" ? "default" : "outline"} 
                size="sm"
                onClick={() => setView("week")}
              >
                <List className="h-4 w-4 mr-1" />
                Week
              </Button>
              <Button 
                variant={view === "day" ? "default" : "outline"} 
                size="sm"
                onClick={() => setView("day")}
              >
                <Clock className="h-4 w-4 mr-1" />
                Day
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentMonth(new Date())}
            >
              Today
            </Button>
            <CreateTazqButton variant="outline" size="sm" />
          </div>
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