import { format } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { getPriorityColor } from "@/utils/styles";
import type { Task } from "@/types/task";

interface CalendarDayContentProps {
  date: Date;
  tasks: Task[];
  view?: "month" | "week" | "day";
}

export const CalendarDayContent = ({ date, tasks, view = "month" }: CalendarDayContentProps) => {
  const isDetailedView = view === "week" || view === "day";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          className={cn(
            "w-full h-full flex flex-col items-center justify-center",
            isDetailedView && "min-h-[100px] py-2"
          )}
          role="button"
          tabIndex={0}
        >
          <span className={cn(
            "text-sm",
            isDetailedView && "font-semibold mb-2"
          )}>
            {format(date, isDetailedView ? 'MMM d' : 'd')}
          </span>
          {tasks.length > 0 && (
            <div className={cn(
              "flex gap-1 mt-1",
              isDetailedView && "flex-col items-start w-full px-2"
            )}>
              {tasks.slice(0, isDetailedView ? undefined : 3).map((task) => (
                isDetailedView ? (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 text-xs w-full truncate py-1 px-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        getPriorityColor(task.priority)
                      )}
                    />
                    <span className="truncate">{task.title}</span>
                  </div>
                ) : (
                  <div
                    key={task.id}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      getPriorityColor(task.priority)
                    )}
                    aria-hidden="true"
                  />
                )
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