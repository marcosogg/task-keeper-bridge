import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface CalendarHeaderProps {
  onTodayClick: () => void;
}

export const CalendarHeader = ({ onTodayClick }: CalendarHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-xl font-semibold">Calendar</CardTitle>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onTodayClick}
      >
        Today
      </Button>
    </CardHeader>
  );
};