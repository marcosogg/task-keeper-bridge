import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { CalendarContent } from "@/components/calendar/CalendarContent";

const Calendar = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <CalendarContent />
      </div>
    </div>
  );
};

export default Calendar;