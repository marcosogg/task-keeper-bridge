import { CalendarPlus, ListPlus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const WelcomeBanner = () => {
  const handleQuickAction = (action: string) => {
    toast.success(`${action} action initiated`);
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm animate-fadeIn" role="banner">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1" role="status">
            Here's what's happening with your family today.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => handleQuickAction("Add Task")}
            className="flex-1 md:flex-none bg-primary hover:bg-primary-dark text-white transition-colors"
            aria-label="Add new task"
          >
            <ListPlus className="mr-2 h-4 w-4" aria-hidden="true" />
            Add Task
          </Button>
          <Button 
            onClick={() => handleQuickAction("Schedule Event")}
            variant="outline"
            className="flex-1 md:flex-none border-primary text-primary hover:bg-primary/10 transition-colors"
            aria-label="Create new event"
          >
            <CalendarPlus className="mr-2 h-4 w-4" aria-hidden="true" />
            New Event
          </Button>
          <Button 
            onClick={() => handleQuickAction("Send Message")}
            variant="outline"
            className="flex-1 md:flex-none border-primary text-primary hover:bg-primary/10 transition-colors"
            aria-label="Send new message"
          >
            <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};