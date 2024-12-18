import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Paperclip, Send } from "lucide-react";
import { Conversation } from "./MessagesContent";
import { cn } from "@/lib/utils";

interface ConversationViewProps {
  conversation: Conversation | undefined;
  onBack: () => void;
  className?: string;
}

export const ConversationView = ({
  conversation,
  onBack,
  className
}: ConversationViewProps) => {
  if (!conversation) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <p className="text-muted-foreground">
          Select a conversation to start messaging
        </p>
      </div>
    );
  }

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
          {conversation.avatar || conversation.name.charAt(0)}
        </div>
        <div>
          <h2 className="font-medium">{conversation.name}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Message bubbles would go here */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">Hey, how are you?</p>
              <span className="text-xs text-muted-foreground mt-1">10:30 AM</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-primary text-white rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">I'm good! How about you?</p>
              <span className="text-xs text-primary-foreground/80 mt-1">10:31 AM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};