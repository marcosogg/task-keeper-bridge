import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface NotificationBellProps {
  unreadCount: number;
  isLoading?: boolean;
}

export const NotificationBell = React.forwardRef<HTMLButtonElement, NotificationBellProps>(({ unreadCount, isLoading }, ref) => {
  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" className="relative" disabled ref={ref}>
        <Bell className="h-5 w-5 text-gray-400" />
        <Skeleton className="absolute -top-1 -right-1 h-4 w-4 rounded-full" />
      </Button>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      aria-label={`Notifications - ${unreadCount} unread`}
      ref={ref}
    >
      <Bell className="h-5 w-5 text-gray-600" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </Button>
  );
});

NotificationBell.displayName = "NotificationBell";
