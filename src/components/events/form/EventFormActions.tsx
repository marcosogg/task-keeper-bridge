import { Button } from "@/components/ui/button";
import { Users, Tag, Bell } from "lucide-react";
import { Label } from "@/components/ui/label";

export const EventFormActions = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Attendees</Label>
          <Button variant="outline" className="w-full mt-1.5 justify-start">
            <Users className="mr-2 h-4 w-4" />
            Invite family members
          </Button>
        </div>

        <div>
          <Label>Category (Optional)</Label>
          <Button variant="outline" className="w-full mt-1.5 justify-start">
            <Tag className="mr-2 h-4 w-4" />
            Select category
          </Button>
        </div>
      </div>

      <div>
        <Label>Reminders (Optional)</Label>
        <Button variant="outline" className="w-full mt-1.5 justify-start">
          <Bell className="mr-2 h-4 w-4" />
          Set reminders
        </Button>
      </div>
    </>
  );
};