import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Users, Paperclip } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TaskFormActions = () => {
  const [isAssigneesOpen, setIsAssigneesOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const handleAssigneesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAssigneesOpen(true);
  };

  const handleAttachmentsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Assignees</Label>
          <Button 
            variant="outline" 
            className="w-full mt-1.5 justify-start"
            onClick={handleAssigneesClick}
            type="button"
          >
            <Users className="mr-2 h-4 w-4" />
            Select family members
          </Button>
        </div>

        <div>
          <Label>Category (Optional)</Label>
          <Select>
            <SelectTrigger className="w-full mt-1.5">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Attachments (Optional)</Label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <Button 
          variant="outline" 
          className="w-full mt-1.5 justify-start"
          onClick={handleAttachmentsClick}
          type="button"
        >
          <Paperclip className="mr-2 h-4 w-4" />
          {selectedFiles.length > 0 
            ? `${selectedFiles.length} file${selectedFiles.length === 1 ? '' : 's'} selected`
            : 'Add attachments'}
        </Button>
        {selectedFiles.length > 0 && (
          <div className="mt-2 text-sm text-muted-foreground">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2">
                <Paperclip className="h-3 w-3" />
                {file.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assignees Modal */}
      <Dialog open={isAssigneesOpen} onOpenChange={setIsAssigneesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Family Members</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {/* We'll implement the family members selection in a future update */}
            <p className="text-muted-foreground">No family members available</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};