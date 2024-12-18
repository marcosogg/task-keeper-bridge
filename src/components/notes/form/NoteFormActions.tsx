import { Button } from "@/components/ui/button";
import { Users, ListChecks } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NoteFormActionsProps {
  isChecklist: boolean;
  onChecklistChange: (value: boolean) => void;
}

export const NoteFormActions = ({ isChecklist, onChecklistChange }: NoteFormActionsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="flex items-center gap-2">
            <Switch
              checked={isChecklist}
              onCheckedChange={onChecklistChange}
            />
            <span className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              Make this a checklist
            </span>
          </Label>
        </div>

        <div>
          <Label>Share with Family (Optional)</Label>
          <Button variant="outline" className="w-full mt-1.5 justify-start">
            <Users className="mr-2 h-4 w-4" />
            Select family members
          </Button>
        </div>
      </div>
    </>
  );
};