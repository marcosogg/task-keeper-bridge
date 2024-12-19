import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMessages } from "@/hooks/queries/useMessages";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Loader2, Send } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

interface ConversationViewProps {
  conversation?: any; // We'll properly type this later
  onBack: () => void;
  className?: string;
}

export const ConversationView = ({ conversation, onBack, className }: ConversationViewProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { messages, isLoading, sendMessage } = useMessages(conversation?.id);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversation?.id) return;

    try {
      await sendMessage({ content: newMessage.trim() });
      setNewMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!conversation) {
    return (
      <div className={`flex-1 flex items-center justify-center text-gray-500 ${className}`}>
        Select a conversation to start messaging
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex-1 flex items-center justify-center ${className}`}>
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col h-full ${className}`}>
      <div className="border-b p-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-medium">{conversation.name || "New Conversation"}</span>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender.id === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender.id === user?.id
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
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};