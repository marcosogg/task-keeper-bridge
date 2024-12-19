import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, Settings, Users, Plus } from "lucide-react";
import { InviteMemberModal } from "./InviteMemberModal";
import { FamilyMemberCard } from "./FamilyMemberCard";
import { FamilyGroupSettings } from "./FamilyGroupSettings";
import { CreateFamilyModal } from "./CreateFamilyModal";
import { JoinFamilyModal } from "./JoinFamilyModal";
import { useFamilyMembers } from "@/hooks/queries/useFamilyMembers";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OnlineStatus } from "./OnlineStatus";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const FamilyContent = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const { user } = useAuth();

  // First, get the user's family with proper error handling
  const { data: userFamily, error: familyError } = useQuery({
    queryKey: ['userFamily', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      try {
        const { data: familyMember, error } = await supabase
          .from('family_members')
          .select('families(*)')
          .eq('profile_id', user.id)
          .eq('status', 'active')
          .maybeSingle();

        if (error) {
          console.error('Error fetching family:', error);
          throw error;
        }

        return familyMember?.families;
      } catch (error) {
        console.error('Failed to fetch family data:', error);
        throw error;
      }
    },
    enabled: !!user?.id,
    retry: 3, // Retry failed requests 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
  
  const { data: familyMembers, isLoading, error: membersError } = useFamilyMembers(userFamily?.id);

  // Handle errors gracefully
  if (familyError || membersError) {
    toast.error("Failed to load family data. Please try again later.");
    console.error('Family data error:', familyError || membersError);
  }

  const hasFamily = userFamily !== null && userFamily !== undefined;

  return (
    <main className="flex-1 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Family Groups</h2>
          <p className="text-sm text-muted-foreground">
            {hasFamily 
              ? `Manage your family group "${userFamily?.name}" and member roles`
              : "Create or join a family group to get started"
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasFamily ? (
            <>
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
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowJoinModal(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                Join Group
              </Button>
            </div>
          )}
        </div>
      </div>

      {hasFamily ? (
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Members</h3>
                <p className="text-sm text-muted-foreground">
                  {familyMembers?.length || 0} members in {userFamily?.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Copy invite code to clipboard
                    if (userFamily?.invite_code) {
                      navigator.clipboard.writeText(userFamily.invite_code);
                      toast.success("Invite code copied to clipboard");
                    }
                  }}
                >
                  Copy Invite Code
                </Button>
                <Button size="sm" onClick={() => setShowInviteModal(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
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
                    <div key={member.id} className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{member.profiles?.full_name?.[0] || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.profiles?.full_name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <OnlineStatus familyId={userFamily.id} userId={member.profiles?.id} />
                    </div>
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
      ) : (
        <Card className="p-6">
          <div className="text-center space-y-6">
            <Users className="h-12 w-12 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No Family Group</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Create a new family group or join an existing one to start managing tasks and events together.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
              <Button variant="outline" onClick={() => setShowJoinModal(true)}>
                <Users className="h-4 w-4 mr-2" />
                Join Group
              </Button>
            </div>
          </div>
        </Card>
      )}

      <CreateFamilyModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal}
      />

      <InviteMemberModal
        open={showInviteModal}
        onOpenChange={setShowInviteModal}
      />

      <JoinFamilyModal
        open={showJoinModal}
        onOpenChange={setShowJoinModal}
      />
    </main>
  );
};