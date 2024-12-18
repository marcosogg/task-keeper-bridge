import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, Settings, Users } from "lucide-react";
import { InviteMemberModal } from "./InviteMemberModal";
import { FamilyMemberCard } from "./FamilyMemberCard";
import { FamilyGroupSettings } from "./FamilyGroupSettings";
import { useFamilyMembers } from "@/hooks/queries/useFamilyMembers";
import { useAuth } from "@/contexts/AuthContext";

export const FamilyContent = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { user } = useAuth();
  
  // For now, we'll just get the first family the user is a member of
  const { data: familyMembers, isLoading } = useFamilyMembers(user?.id);

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
                {familyMembers?.length || 0} members
              </span>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-20rem)]">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-muted animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {familyMembers?.map((member) => (
                  <FamilyMemberCard
                    key={member.id}
                    member={{
                      id: member.id,
                      name: member.profiles?.full_name || member.profiles?.email || 'Unknown',
                      role: member.role,
                      avatar: member.profiles?.avatar_url || member.profiles?.full_name?.charAt(0) || 'U',
                      status: member.status,
                      email: member.profiles?.email || ''
                    }}
                  />
                ))}
              </div>
            )}
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