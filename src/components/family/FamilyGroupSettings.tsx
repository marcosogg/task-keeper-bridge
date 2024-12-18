import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FamilyGroupSettingsProps {
  onClose: () => void;
}

export const FamilyGroupSettings = ({ onClose }: FamilyGroupSettingsProps) => {
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your family group settings have been updated.",
    });
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
            defaultValue="Doe Family"
            placeholder="Enter group name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Add a description for your family group"
            defaultValue="Our wonderful family group for staying connected and organized."
          />
        </div>
        <div className="pt-4 space-y-4">
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full text-destructive hover:text-destructive"
          >
            Leave Group
          </Button>
        </div>
      </form>
    </div>
  );
};