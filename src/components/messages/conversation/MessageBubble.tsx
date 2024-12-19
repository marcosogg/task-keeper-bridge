import { format } from "date-fns";

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    created_at: string;
    sender: {
      id: string;
      full_name: string;
    };
  };
  isCurrentUser: boolean;
}

export const MessageBubble = ({ message, isCurrentUser }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">
            {message.sender.full_name}
          </span>
          <span className="text-xs opacity-70">
            {format(new Date(message.created_at), "p")}
          </span>
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};