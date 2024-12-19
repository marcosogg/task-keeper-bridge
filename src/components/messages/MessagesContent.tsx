import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFamily } from "@/contexts/FamilyContext";
import { messagingService } from "@/services/messaging";
import { ChatInterface } from "./ChatInterface";
import { NewPrivateMessageDialog } from "./NewPrivateMessageDialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export const MessagesContent = () => {
  const { currentFamily } = useFamily();
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [isMobileViewingChannel, setIsMobileViewingChannel] = useState(false);

  const { data: channels = [], isLoading } = useQuery({
    queryKey: ["channels", currentFamily?.id],
    queryFn: () => messagingService.getChannels(currentFamily!.id),
    enabled: !!currentFamily,
  });

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
    setIsMobileViewingChannel(true);
  };

  const handleBackToList = () => {
    setIsMobileViewingChannel(false);
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

  return (
    <main className="flex-1 flex">
      <div
        className={`w-full md:w-80 border-r ${
          isMobileViewingChannel ? "hidden md:block" : "block"
        }`}
      >
        <div className="p-4 border-b">
          <NewPrivateMessageDialog />
        </div>
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <div className="space-y-2 p-4">
            {channels.map((channel) => (
              <Button
                key={channel.id}
                variant={selectedChannel === channel.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleChannelSelect(channel.id)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{channel.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(channel.created_at), "MMM d, yyyy")}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div
        className={`flex-1 ${
          !isMobileViewingChannel ? "hidden md:block" : "block"
        }`}
      >
        {selectedChannel ? (
          <>
            <div className="md:hidden p-4 border-b">
              <Button variant="ghost" onClick={handleBackToList}>
                Back to Channels
              </Button>
            </div>
            <ChatInterface channelId={selectedChannel} />
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select a channel to start messaging
          </div>
        )}
      </div>
    </main>
  );
};