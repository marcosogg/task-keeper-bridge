import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FamilyGroupSettingsProps {
  onClose: () => void;
}

export const FamilyGroupSettings = ({ onClose }: FamilyGroupSettingsProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  // Get family data
  const { data: family } = useQuery({
    queryKey: ["userFamily", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data: familyMember } = await supabase
        .from("family_members")
        .select("families(*)")
        .eq("profile_id", user.id)
        .eq("status", "active")
        .maybeSingle();

      return familyMember?.families;
    },
    enabled: !!user?.id,
  });

  // Initialize form data when family data is loaded
  useState(() => {
    if (family) {
      setFormData({
        name: family.name || "",
      });
    }
  });

  // Update family settings
  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!family?.id) throw new Error("No family found");
      const { error } = await supabase
        .from("families")
        .update({
          name: data.name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", family.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Family group settings updated");
      queryClient.invalidateQueries({ queryKey: ["userFamily"] });
      onClose();
    },
    onError: (error) => {
      console.error("Failed to update family settings:", error);
      toast.error("Failed to update settings. Please try again.");
    },
  });

  // Leave family group
  const leaveMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id || !family?.id) throw new Error("No family or user found");
      
      // Check if user is the last admin
      const { data: admins } = await supabase
        .from("family_members")
        .select("id")
        .eq("family_id", family.id)
        .eq("role", "admin")
        .eq("status", "active");

      if (admins?.length === 1) {
        throw new Error("Cannot leave group: You are the last admin");
      }

      const { error } = await supabase
        .from("family_members")
        .update({
          status: "inactive",
          updated_at: new Date().toISOString(),
        })
        .eq("family_id", family.id)
        .eq("profile_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("You have left the family group");
      queryClient.invalidateQueries({ queryKey: ["userFamily"] });
      onClose();
    },
    onError: (error) => {
      console.error("Failed to leave family:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to leave group. Please try again."
      );
    },
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleLeave = () => {
    leaveMutation.mutate();
    setShowLeaveDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Family Group Settings</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="groupName">Group Name</Label>
          <Input
            id="groupName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter group name"
          />
        </div>
        <div className="pt-4 space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full text-destructive hover:text-destructive"
            onClick={() => setShowLeaveDialog(true)}
            disabled={leaveMutation.isPending}
          >
            {leaveMutation.isPending ? "Leaving..." : "Leave Group"}
          </Button>
        </div>
      </form>

      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Leave Family Group
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave this family group? You'll lose access
              to all shared tasks and events. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLeave}
              className="bg-destructive hover:bg-destructive/90"
            >
              Leave Group
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};