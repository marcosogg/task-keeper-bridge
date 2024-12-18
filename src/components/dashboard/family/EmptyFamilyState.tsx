import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EmptyFamilyState = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Started with Your Family</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Create or join a family group to start managing tasks and events together.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/family')}>
            <Users className="mr-2 h-4 w-4" />
            Create Family
          </Button>
          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Join Family
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};