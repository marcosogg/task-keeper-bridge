import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MessagesContent } from "@/components/messages/MessagesContent";
import { Footer } from "@/components/Footer";

const Messages = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MessagesContent />
      </div>
      <Footer />
    </div>
  );
};

export default Messages;