import { FamilyMember } from "@/types/family";
import { FamilyMemberAvatar } from "./FamilyMemberAvatar";
import { FamilyMemberTooltip } from "./FamilyMemberTooltip";

interface FamilyMembersListProps {
  members: any[];
  memberStats?: any[];
}

export const FamilyMembersList = ({ members, memberStats }: FamilyMembersListProps) => {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {members.map((member) => {
        const stats = memberStats?.find(s => s.profile_id === member.profile_id);
        return (
          <FamilyMemberAvatar
            key={member.id}
            avatarUrl={member.profiles?.avatar_url}
            name={member.profiles?.full_name || ''}
            email={member.profiles?.email || ''}
          >
            <FamilyMemberTooltip
              name={member.profiles?.full_name || member.profiles?.email || 'Unknown'}
              stats={stats}
            />
          </FamilyMemberAvatar>
        );
      })}
    </div>
  );
};