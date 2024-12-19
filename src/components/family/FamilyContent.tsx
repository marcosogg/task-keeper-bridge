import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, Settings, Users, Plus } from "lucide-react";
import { InviteMemberModal } from "./InviteMemberModal";
import { FamilyMemberCard } from "./FamilyMemberCard";
import { FamilyGroupSettings } from "./FamilyGroupSettings";
import { CreateFamilyModal } from "./CreateFamilyModal";
import { useFamilyMembers } from "@/hooks/queries/useFamilyMembers";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const FamilyContent = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
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
            <Button size="sm" onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Family Group
            </Button>
          )}
        </div>
      </div>

      {hasFamily ? (
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
      ) : (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <Users className="h-12 w-12 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No Family Group</h3>
              <p className="text-sm text-muted-foreground">
                Create a family group to start managing tasks and events together
              </p>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Family Group
            </Button>
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
    </main>
  );
};