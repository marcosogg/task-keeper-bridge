import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface CreateFamilyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateFamilyModal = ({
  open,
  onOpenChange,
}: CreateFamilyModalProps) => {
  const [familyName, setFamilyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      // Create the family
      const { data: family, error: familyError } = await supabase
        .from('families')
        .insert({
          name: familyName,
          created_by: user.id
        })
        .select()
        .single();

      if (familyError) throw familyError;

      // Add the creator as an admin member
      const { error: memberError } = await supabase
        .from('family_members')
        .insert({
          family_id: family.id,
          profile_id: user.id,
          role: 'admin',
          status: 'active',
          joined_at: new Date().toISOString()
        });

      if (memberError) throw memberError;

      toast({
        title: "Family group created",
        description: "Your family group has been created successfully.",
      });

      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['familyMembers'] });
      
      onOpenChange(false);
      setFamilyName("");
    } catch (error) {
      console.error('Error creating family:', error);
      toast({
        title: "Error",
        description: "Failed to create family group. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Family Group</DialogTitle>
          <DialogDescription>
            Create a new family group to start managing tasks and events together.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Family Name</Label>
              <Input
                id="name"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="Enter your family name"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !familyName.trim()}>
              {isLoading ? "Creating..." : "Create Family"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};