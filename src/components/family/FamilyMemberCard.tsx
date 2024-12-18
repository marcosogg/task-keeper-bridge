import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: string;
  email: string;
}

interface FamilyMemberCardProps {
  member: FamilyMember;
}

export const FamilyMemberCard = ({ member }: FamilyMemberCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            {member.avatar}
          </div>
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
              member.status === "online" ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        </div>
        <div>
          <h4 className="font-medium">{member.name}</h4>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuItem>Change Role</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            Remove Member
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};