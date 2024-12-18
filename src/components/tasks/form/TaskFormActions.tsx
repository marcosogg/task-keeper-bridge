import { Button } from "@/components/ui/button";
import { Users, Tag, Paperclip } from "lucide-react";
import { Label } from "@/components/ui/label";

export const TaskFormActions = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Assignees</Label>
          <Button variant="outline" className="w-full mt-1.5 justify-start">
            <Users className="mr-2 h-4 w-4" />
            Select family members
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
        <Label>Attachments (Optional)</Label>
        <Button variant="outline" className="w-full mt-1.5 justify-start">
          <Paperclip className="mr-2 h-4 w-4" />
          Add attachments
        </Button>
      </div>
    </>
  );
};