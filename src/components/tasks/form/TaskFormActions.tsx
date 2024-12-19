import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface FamilyMember {
  id: string;
  profile_id: string;
  family_id: string;
  role: string;
  status: string;
  joined_at: string | null;
  created_at: string;
  profiles: {
    id: string;
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}

interface TaskFormActionsProps {
  assignees: string[];
  onAssigneesChange: (assignees: string[]) => void;
  availableAssignees: FamilyMember[];
}

export const TaskFormActions = ({
  assignees,
  onAssigneesChange,
  availableAssignees,
}: TaskFormActionsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Assign to</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {assignees.length > 0
              ? availableAssignees.find((member) => member.profile_id === assignees[0])
                  ?.profiles.full_name
              : "Select member..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search member..." />
            <CommandEmpty>No member found.</CommandEmpty>
            <CommandGroup>
              {availableAssignees.map((member) => (
                <CommandItem
                  key={member.profile_id}
                  value={member.profile_id}
                  onSelect={(currentValue) => {
                    onAssigneesChange(
                      assignees.includes(currentValue)
                        ? assignees.filter((id) => id !== currentValue)
                        : [currentValue]
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      assignees.includes(member.profile_id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={member.profiles.avatar_url || undefined}
                        alt={member.profiles.full_name || ""}
                      />
                      <AvatarFallback>
                        {member.profiles.full_name?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>
                    {member.profiles.full_name}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};