import { useMessages } from "@/hooks/queries/useMessages";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ConversationHeader } from "./conversation/ConversationHeader";
import { MessageList } from "./conversation/MessageList";
import { MessageInput } from "./conversation/MessageInput";
import type { Conversation } from "@/types/conversation";

interface ConversationViewProps {
  conversation?: Conversation;
  onBack: () => void;
  className?: string;
}

export const ConversationView = ({ 
  conversation, 
  onBack, 
  className 
}: ConversationViewProps) => {
  const { messages, isLoading, sendMessage } = useMessages(conversation?.id);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSendMessage = async (content: string) => {
    if (!conversation?.id) return;

    try {
      await sendMessage({ content });
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
      <ConversationHeader name={conversation.name} onBack={onBack} />
      <MessageList messages={messages} currentUserId={user?.id || ''} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};