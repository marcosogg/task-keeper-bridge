import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const TaskDetailsError = () => {
  const navigate = useNavigate();
  
  return (
    <CardContent className="p-6">
      <div className="text-center text-destructive">
        <p>Error loading task details. Please try again later.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </CardContent>
  );
};