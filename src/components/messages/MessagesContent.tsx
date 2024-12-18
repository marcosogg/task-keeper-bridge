import { ConversationList } from "./ConversationList";
import { ConversationView } from "./ConversationView";
import { useState } from "react";

export type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar?: string;
};

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Family Group",
    lastMessage: "Don't forget about dinner tonight!",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: "2",
    name: "Mom",
    lastMessage: "I'll pick up the groceries",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "3",
    name: "Dad",
    lastMessage: "Can you help with the garden?",
    timestamp: "2 days ago",
    unread: false,
  },
];

export const MessagesContent = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isMobileViewingConversation, setIsMobileViewingConversation] = useState(false);

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setIsMobileViewingConversation(true);
  };

  const handleBackToList = () => {
    setIsMobileViewingConversation(false);
  };

  return (
    <main className="flex-1 overflow-hidden">
      <div className="h-[calc(100vh-4rem)] flex">
        <ConversationList
          conversations={mockConversations}
          selectedConversationId={selectedConversation}
          onSelect={handleConversationSelect}
          className={`${
            isMobileViewingConversation ? "hidden md:block" : "block"
          } w-full md:w-80 border-r border-gray-200 bg-white`}
        />
        <ConversationView
          conversation={mockConversations.find(c => c.id === selectedConversation)}
          onBack={handleBackToList}
          className={`${
            isMobileViewingConversation ? "block" : "hidden md:block"
          } flex-1 bg-white`}
        />
      </div>
    </main>
  );
};