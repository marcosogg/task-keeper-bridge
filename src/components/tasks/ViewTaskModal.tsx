// src/components/tasks/ViewTaskModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskDetailsContent } from "./details/TaskDetailsContent";
import type { Task } from "@/types/task";
import { TaskDetailsHeader } from "./details/TaskDetailsHeader";
import { DeleteTaskDialog } from "./details/DeleteTaskDialog";
import { EditTaskModal } from "./EditTaskModal";
import { useState } from "react";


interface ViewTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
}

export const ViewTaskModal = ({ open, onOpenChange, task }: ViewTaskModalProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditTask = () => {
        setEditModalOpen(true)
  }
  const handleDeleteTask = () => {
        setDeleteModalOpen(true)
  }

  if(!task) return null;
  const assignedToName = task.assigned_to_profile?.map(assignee => assignee.full_name).join(', ') || null;


  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
           <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                  <DialogTitle>{task.title}</DialogTitle>
              </DialogHeader>
              <TaskDetailsHeader
                title={task.title}
                priority={task.priority}
                status={task.status}
                onEdit={handleEditTask}
               onDelete={handleDeleteTask}
              />
            <TaskDetailsContent
              description={task.description}
              dueDate={task.due_date}
              assignedToName={assignedToName}
              task={task}
           />
             <EditTaskModal
                  open={editModalOpen}
                  onOpenChange={setEditModalOpen}
                  task={task}
              />
             <DeleteTaskDialog
                  open={deleteModalOpen}
                  onOpenChange={setDeleteModalOpen}
                  taskId={task.id}
              />
          </DialogContent>
      </Dialog>
  );
};