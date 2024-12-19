import { NotificationItem } from "./NotificationItem";
import { Notification } from "@/types/notification";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => Promise<void>;
  onDismiss: (id: string) => Promise<void>;
}

export const NotificationList = ({
  notifications,
  onMarkAsRead,
  onDismiss,
}: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-4">
        No notifications
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};