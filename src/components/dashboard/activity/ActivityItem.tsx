import { AlertOctagon, MessageSquare, User } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActivityItemProps {
  type: string;
  content: Record<string, any>;
  createdAt: string;
  profileName: string;
  profileAvatarUrl: string | null;
}

export const ActivityItem = ({ 
  type, 
  content, 
  createdAt, 
  profileName,
  profileAvatarUrl 
}: ActivityItemProps) => {
  const getIcon = () => {
    switch (type) {
      case 'task':
        return <AlertOctagon className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  const getMessage = () => {
    if (content.message) {
      return content.message;
    }
    return `${profileName} performed a ${type} action`;
  };

  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors">
      <Avatar className="h-8 w-8">
        <AvatarImage src={profileAvatarUrl || undefined} alt={profileName} />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {getMessage()}
        </p>
        <p className="text-sm text-gray-500">
          {format(new Date(createdAt), 'MMM d, yyyy h:mm a')}
        </p>
      </div>
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
    </div>
  );
};