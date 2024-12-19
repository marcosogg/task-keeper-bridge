import { cn } from "@/lib/utils";
import { usePresence } from "@/hooks/usePresence";

interface OnlineStatusProps {
  familyId: string;
  userId: string;
  className?: string;
}

export const OnlineStatus = ({ familyId, userId, className }: OnlineStatusProps) => {
  const { getOnlineMembers } = usePresence(familyId);
  const onlineMembers = getOnlineMembers();
  const isOnline = !!onlineMembers[userId];

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        className
      )}
    >
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          isOnline ? "bg-green-500" : "bg-gray-300"
        )}
      />
      <span className="text-sm text-muted-foreground">
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
};
