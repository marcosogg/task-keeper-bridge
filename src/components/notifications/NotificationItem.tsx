import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Notification } from "@/types/notification";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => Promise<void>;
  onDismiss: (id: string) => Promise<void>;
}

export const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDismiss,
}: NotificationItemProps) => {
  return (
    <div
      className={`p-3 rounded-lg ${
        notification.read ? 'bg-gray-50' : 'bg-primary/5'
      }`}
      role="listitem"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{notification.title}</h3>
          <p className="text-sm text-gray-600">{notification.message}</p>
          <span className="text-xs text-gray-500">
            {format(new Date(notification.created_at), 'p')}
          </span>
        </div>
        <div className="flex gap-1">
          {!notification.read && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onMarkAsRead(notification.id)}
              aria-label="Mark as read"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onDismiss(notification.id)}
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};