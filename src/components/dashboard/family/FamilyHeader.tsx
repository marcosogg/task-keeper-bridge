import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FamilyHeaderProps {
  familyName: string;
}

export const FamilyHeader = ({ familyName }: FamilyHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-xl font-bold">
        {familyName}
      </CardTitle>
      <Button variant="outline" size="sm" onClick={() => navigate('/family')}>
        <Users className="mr-2 h-4 w-4" />
        Manage Family
      </Button>
    </div>
  );
};