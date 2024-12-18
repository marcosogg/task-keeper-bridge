import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MessagesContent } from "@/components/messages/MessagesContent";

const Messages = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <MessagesContent />
      </div>
    </div>
  );
};

export default Messages;