import { Button } from "@/components/ui/button";
import { Calendar, List, Clock } from "lucide-react";
import { CreateTazqButton } from "../CreateTazqButton";

interface CalendarHeaderProps {
  view: "month" | "week" | "day";
  setView: (view: "month" | "week" | "day") => void;
  setCurrentMonth: (date: Date) => void;
}

export const CalendarHeader = ({ view, setView, setCurrentMonth }: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between space-y-0 pb-2">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">Calendar</h2>
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
    </div>
  );
};