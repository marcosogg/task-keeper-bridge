import { format } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { getPriorityColor } from "@/utils/styles";
import type { Task } from "@/types/task";

interface CalendarDayContentProps {
  date: Date;
  tasks: Task[];
}

export const CalendarDayContent = ({ date, tasks }: CalendarDayContentProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          className="w-full h-full flex flex-col items-center justify-center"
          role="button"
          tabIndex={0}
        >
          <span>{format(date, 'd')}</span>
          {tasks.length > 0 && (
            <div className="flex gap-1 mt-1">
              {tasks.slice(0, 3).map((task) => (
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
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} scheduled
          </p>
          {tasks.length > 0 && (
            <ul className="text-sm space-y-1">
              {tasks.map(task => (
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
};