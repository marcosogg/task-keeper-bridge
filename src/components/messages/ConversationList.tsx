import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Conversation } from "./MessagesContent";
import { cn } from "@/lib/utils";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelect: (conversationId: string) => void;
  className?: string;
}

export const ConversationList = ({
  conversations,
  selectedConversationId,
  onSelect,
  className
}: ConversationListProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex-1">
            <MessageSquarePlus className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100",
              selectedConversationId === conversation.id && "bg-primary/5"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                {conversation.avatar || conversation.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{conversation.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread && (
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};