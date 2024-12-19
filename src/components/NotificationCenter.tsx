import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/hooks/queries/useNotifications";
import { NotificationBell } from "./notifications/NotificationBell";
import { NotificationList } from "./notifications/NotificationList";

export const NotificationCenter = () => {
  const { toast } = useToast();
  const { notifications, isLoading, markAsRead, dismiss } = useNotifications();

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      toast({
        title: "Notification marked as read",
        description: "The notification has been marked as read.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notification as read.",
        variant: "destructive",
      });
    }
  };

  const handleDismiss = async (id: string) => {
    try {
      await dismiss(id);
      toast({
        title: "Notification dismissed",
        description: "The notification has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to dismiss notification.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NotificationBell unreadCount={unreadCount} isLoading={isLoading} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <NotificationList
            notifications={notifications || []}
            onMarkAsRead={handleMarkAsRead}
            onDismiss={handleDismiss}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};