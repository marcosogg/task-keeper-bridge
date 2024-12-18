import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface FamilyMember {
  id: string;
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
            {typeof member.avatar === 'string' && member.avatar.length === 1 
              ? member.avatar.toUpperCase()
              : member.name.charAt(0).toUpperCase()
            }
          </div>
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
              member.status === "active" ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        </div>
        <div>
          <h4 className="font-medium">{member.name}</h4>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{member.email}</p>
            <Badge variant="secondary" className="text-xs">
              {member.role}
            </Badge>
          </div>
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