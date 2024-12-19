import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { TaskDialog } from "./calendar/TaskDialog";
import { CalendarWrapper } from "./calendar/CalendarWrapper";
import { CalendarHeader } from "./calendar/CalendarHeader";
import { CalendarSkeleton } from "./calendar/CalendarSkeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Task } from "@/types/task";

export const StatsPanel = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();

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
        .eq('family_id', familyMember?.family_id);

      if (error) throw error;
      
      return (data as any[]).map(task => ({
        ...task,
        status: task.status as Task['status'],
        priority: task.priority as Task['priority']
      })) as Task[];
    },
    enabled: !!user
  });

  useEffect(() => {
    if (!user) return;

    const getFamilyId = async () => {
      const { data: familyMember } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user.id)
        .maybeSingle();
      
      return familyMember?.family_id;
    };

    getFamilyId().then(familyId => {
      if (!familyId) return;

      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'tasks',
            filter: `family_id=eq.${familyId}`
          },
          () => {
            void queryClient.invalidateQueries({ queryKey: ['tasks'] });
          }
        )
        .subscribe();

      return () => {
        void supabase.removeChannel(channel);
      };
    });
  }, [user, queryClient]);

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