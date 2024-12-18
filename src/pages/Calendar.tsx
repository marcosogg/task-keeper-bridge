import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { CalendarContent } from "@/components/calendar/CalendarContent";
import { Footer } from "@/components/Footer";

const Calendar = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <CalendarContent />
      </div>
      <Footer />
    </div>
  );
};

export default Calendar;