import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateTazqModal } from "./CreateTazqModal";

interface CreateTazqButtonProps {
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export const CreateTazqButton = ({ 
  variant = "default",
  size = "default",
  className 
}: CreateTazqButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        <Plus className="mr-2 h-4 w-4" />
        Create TAZQ
      </Button>
      <CreateTazqModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};