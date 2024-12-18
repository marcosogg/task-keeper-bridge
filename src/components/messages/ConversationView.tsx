import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Paperclip, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ConversationViewProps {
  conversation: any;
  onBack: () => void;
  className?: string;
}

export const ConversationView = ({
  conversation,
  onBack,
  className
}: ConversationViewProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();

  if (!conversation) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <p className="text-muted-foreground">
          Select a conversation to start messaging
        </p>
      </div>
    );
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversation.id,
          content: newMessage,
          sender_id: user?.id
        });

      if (error) throw error;
      setNewMessage("");
    } catch (error: any) {
      toast.error("Failed to send message");
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
          {conversation.name?.charAt(0) || "C"}
        </div>
        <div>
          <h2 className="font-medium">{conversation.name || "New Conversation"}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {conversation.messages?.map((message: any) => (
            <div
              key={message.id}
              className={cn("flex", message.sender_id === user?.id ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "rounded-lg p-3 max-w-[80%]",
                  message.sender_id === user?.id
                    ? "bg-primary text-white"
                    : "bg-gray-100"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <span className={cn(
                  "text-xs mt-1",
                  message.sender_id === user?.id
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                )}>
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};