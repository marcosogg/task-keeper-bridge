// src/components/tasks/form/TaskFormActions.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MultiSelect } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
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
  const assigneeOptions = availableAssignees.map((member) => ({
    label: member.profiles.full_name || member.profiles.email || "Unknown",
    value: member.profile_id,
  }));

  const renderOption = (option: { label: string; value: string }) => {
    const member = availableAssignees.find((m) => m.profile_id === option.value);
    if (!member) return option.label;

    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage
            src={member.profiles.avatar_url || undefined}
            alt={member.profiles.full_name || ""}
          />
          <AvatarFallback>
            {(member.profiles.full_name || member.profiles.email || "?").charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span>{member.profiles.full_name || member.profiles.email || "Unknown"}</span>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <label htmlFor="assignees" className="text-sm font-medium">Assign to</label>
      <MultiSelect
        options={assigneeOptions}
        selected={assignees}
        onChange={onAssigneesChange}
        placeholder="Select members..."
        className="w-full"
        renderOption={renderOption}
      />
    </div>
  );
};
