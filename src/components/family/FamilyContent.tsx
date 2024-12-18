import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, Settings, Users } from "lucide-react";
import { InviteMemberModal } from "./InviteMemberModal";
import { FamilyMemberCard } from "./FamilyMemberCard";
import { FamilyGroupSettings } from "./FamilyGroupSettings";

const mockFamilyMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Parent",
    avatar: "JD",
    status: "online",
    email: "john@example.com"
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Parent",
    avatar: "JD",
    status: "offline",
    email: "jane@example.com"
  },
  {
    id: 3,
    name: "Tommy Doe",
    role: "Child",
    avatar: "TD",
    status: "online",
    email: "tommy@example.com"
  }
];

export const FamilyContent = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <main className="flex-1 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Family Members</h2>
          <p className="text-sm text-muted-foreground">
            Manage your family group and member roles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm" onClick={() => setShowInviteModal(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Members</h3>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {mockFamilyMembers.length} members
              </span>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-4">
              {mockFamilyMembers.map((member) => (
                <FamilyMemberCard key={member.id} member={member} />
              ))}
            </div>
          </ScrollArea>
        </Card>

        {showSettings && (
          <Card className="p-6">
            <FamilyGroupSettings onClose={() => setShowSettings(false)} />
          </Card>
        )}
      </div>

      <InviteMemberModal
        open={showInviteModal}
        onOpenChange={setShowInviteModal}
      />
    </main>
  );
};