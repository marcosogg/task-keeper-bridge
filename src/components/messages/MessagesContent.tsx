import { ConversationList } from "./ConversationList";
import { ConversationView } from "./ConversationView";
import { useState } from "react";
import { useConversations } from "@/hooks/queries/useConversations";
import { Skeleton } from "@/components/ui/skeleton";

export type Conversation = {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp?: string;
  unread: boolean;
  avatar?: string;
};

export const MessagesContent = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isMobileViewingConversation, setIsMobileViewingConversation] = useState(false);
  const { data: conversations, isLoading } = useConversations();

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setIsMobileViewingConversation(true);
  };

  const handleBackToList = () => {
    setIsMobileViewingConversation(false);
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-4">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  const formattedConversations = conversations?.map((conv: any) => ({
    id: conv.id,
    name: conv.name || "New Conversation",
    lastMessage: conv.messages?.[0]?.content || "No messages yet",
    timestamp: conv.messages?.[0]?.created_at 
      ? new Date(conv.messages[0].created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : "",
    unread: false, // TODO: Implement unread status
    avatar: conv.conversation_members?.[0]?.profile?.avatar_url
  })) || [];

  const selectedConversationData = conversations?.find(
    (conv: any) => conv.id === selectedConversation
  );

  return (
    <main className="flex-1 overflow-hidden">
      <div className="h-[calc(100vh-4rem)] flex">
        <ConversationList
          conversations={formattedConversations}
          selectedConversationId={selectedConversation}
          onSelect={handleConversationSelect}
          className={`${
            isMobileViewingConversation ? "hidden md:block" : "block"
          } w-full md:w-80 border-r border-gray-200 bg-white`}
        />
        <ConversationView
          conversation={selectedConversationData}
          onBack={handleBackToList}
          className={`${
            isMobileViewingConversation ? "block" : "hidden md:block"
          } flex-1 bg-white`}
        />
      </div>
    </main>
  );
};