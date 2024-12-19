import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/queries/useNotifications";
import { NotificationBell } from "./notifications/NotificationBell";
import { NotificationList } from "./notifications/NotificationList";
import { handleError } from "@/lib/error-handling";

export const NotificationCenter = () => {
  const { notifications, isLoading, markAsRead, dismiss } = useNotifications();

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
    } catch (error) {
      handleError(error, "Failed to mark notification as read");
    }
  };

  const handleDismiss = async (id: string) => {
    try {
      await dismiss(id);
    } catch (error) {
      handleError(error, "Failed to dismiss notification");
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