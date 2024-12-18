import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Search, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CreateMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FamilyMember {
  id: string;
  name: string;
  avatar?: string;
}

const mockFamilyMembers: FamilyMember[] = [
  { id: "1", name: "Mom" },
  { id: "2", name: "Dad" },
  { id: "3", name: "Sister" },
  { id: "4", name: "Brother" },
  { id: "5", name: "Grandma" },
];

export const CreateMessageModal = ({ open, onOpenChange }: CreateMessageModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<FamilyMember[]>([]);
  const [groupName, setGroupName] = useState("");

  const filteredMembers = mockFamilyMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedMembers.find((selected) => selected.id === member.id)
  );

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMembers([...selectedMembers, member]);
    setSearchQuery("");
  };

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
  };

  const handleStartChat = () => {
    // Here you would implement the logic to start a new chat
    console.log("Starting chat with:", selectedMembers, "Group name:", groupName);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">New Message</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>To:</Label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for family members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            {searchQuery && filteredMembers.length > 0 && (
              <div className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-md border bg-popover shadow-md">
                {filteredMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handleSelectMember(member)}
                    className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      {member.avatar || member.name.charAt(0)}
                    </div>
                    <span>{member.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedMembers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-full text-sm"
                >
                  <span>{member.name}</span>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {selectedMembers.length > 1 && (
            <div className="space-y-2">
              <Label>Group Name (Optional)</Label>
              <Input
                placeholder="Enter group name..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleStartChat}
            disabled={selectedMembers.length === 0}
            className="w-full sm:w-auto"
          >
            <Users className="mr-2 h-4 w-4" />
            Start Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};