import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface ConversationHeaderProps {
  name: string | null;
  onBack: () => void;
}

export const ConversationHeader = ({ name, onBack }: ConversationHeaderProps) => {
  return (
    <div className="border-b p-4 flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="font-medium">{name || "New Conversation"}</span>
    </div>
  );
};