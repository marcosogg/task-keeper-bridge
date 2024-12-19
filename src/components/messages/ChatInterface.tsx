import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { messagingService } from "@/services/messaging";
import { Message } from "@/types/messaging";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Send } from "lucide-react";

interface ChatInterfaceProps {
  channelId: string;
}

export function ChatInterface({ channelId }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", channelId],
    queryFn: () => messagingService.getMessages(channelId),
  });

  useEffect(() => {
    const subscription = messagingService.subscribeToMessages(
      channelId,
      (newMessage) => {
        queryClient.setQueryData<Message[]>(["messages", channelId], (old = []) => [
          newMessage,
          ...old,
        ]);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [channelId, queryClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!newMessage.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await messagingService.sendMessage(channelId, newMessage.trim());
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender_id === user?.id ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender?.avatar_url || ""} />
                <AvatarFallback>
                  {message.sender?.full_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex flex-col ${
                  message.sender_id === user?.id ? "items-end" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {message.sender?.full_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(message.created_at), "p")}
                  </span>
                </div>
                <div
                  className={`mt-1 rounded-lg p-3 ${
                    message.sender_id === user?.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="min-h-[80px]"
          />
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !newMessage.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
