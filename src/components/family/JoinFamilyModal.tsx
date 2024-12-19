import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface JoinFamilyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JoinFamilyModal = ({ open, onOpenChange }: JoinFamilyModalProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [inviteCode, setInviteCode] = useState("");

  const joinMutation = useMutation({
    mutationFn: async (code: string) => {
      if (!user?.id) throw new Error("Not authenticated");

      // First, find the family with this invite code
      const { data: family, error: findError } = await supabase
        .from("families")
        .select("id")
        .eq("invite_code", code)
        .single();

      if (findError) throw new Error("Invalid invite code");
      if (!family) throw new Error("Family not found");

      // Check if user is already a member
      const { data: existingMember } = await supabase
        .from("family_members")
        .select("id, status")
        .eq("family_id", family.id)
        .eq("profile_id", user.id)
        .maybeSingle();

      if (existingMember) {
        if (existingMember.status === "active") {
          throw new Error("You are already a member of this family group");
        }
        // Reactivate membership if inactive
        const { error: updateError } = await supabase
          .from("family_members")
          .update({
            status: "active",
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingMember.id);

        if (updateError) throw updateError;
      } else {
        // Create new membership
        const { error: joinError } = await supabase
          .from("family_members")
          .insert({
            family_id: family.id,
            profile_id: user.id,
            role: "member",
            status: "active",
          });

        if (joinError) throw joinError;
      }
    },
    onSuccess: () => {
      toast.success("Successfully joined family group!");
      queryClient.invalidateQueries({ queryKey: ["userFamily"] });
      onOpenChange(false);
      setInviteCode("");
    },
    onError: (error) => {
      console.error("Failed to join family:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to join family group. Please try again."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) {
      toast.error("Please enter an invite code");
      return;
    }
    joinMutation.mutate(inviteCode.trim());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Family Group</DialogTitle>
          <DialogDescription>
            Enter the invite code to join an existing family group
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inviteCode">Invite Code</Label>
            <Input
              id="inviteCode"
              placeholder="Enter invite code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={joinMutation.isPending || !inviteCode.trim()}
            >
              {joinMutation.isPending ? "Joining..." : "Join Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
