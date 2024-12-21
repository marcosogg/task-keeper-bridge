import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TaskDetailsHeader } from "./details/TaskDetailsHeader";
import { TaskDetailsContent } from "./details/TaskDetailsContent";
import { TaskDetailsSkeleton } from "./details/TaskDetailsSkeleton";
import { TaskDetailsError } from "./details/TaskDetailsError";
import { Card } from "@/components/ui/card";
import { DeleteTaskDialog } from "./details/DeleteTaskDialog";
import { EditTaskModal } from "./EditTaskModal";
import { useState } from "react";
import type { Task } from "@/types/task";
import { useAuth } from "@/contexts/AuthContext";
import {  PostgrestError } from "@supabase/supabase-js";

interface Profile {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
    id: string
}

const TaskDetailsPage = () => {
    const { taskId } = useParams();
    const { user } = useAuth();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const { data: task, isLoading, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: async () => {
            if (!taskId) throw new Error("Task ID is required");
            if (!user?.id) throw new Error("User not authenticated");


            const { data: familyMember, error: familyError } = await supabase
              .from('family_members')
              .select('family_id')
              .eq('profile_id', user.id)
                .maybeSingle();
        
            if (familyError) {
              console.error('Error fetching family:', familyError);
                throw familyError;
            }
        
            if (!familyMember) {
              throw new Error("User is not member of a family");
            }

            const { data, error } = await supabase
                .from('tasks')
              .select(`
                  *,
                  assigned_to_profile:task_assignments!task_assignments_task_id_fkey (
                      profiles!task_assignments_profile_id_fkey (
                        full_name,
                        email,
                          avatar_url,
                         id
                      )
                  )
              `)
                .eq('id', taskId)
                .eq('family_id', familyMember.family_id)
                .single();

            if (error) {
                console.error('Error fetching task:', error);
                throw error;
            }
            
            const assignedToProfile = Array.isArray(data?.assigned_to_profile)
                ? data.assigned_to_profile.map((assignee:any) => ({
                    full_name: assignee.profiles.full_name,
                    email: assignee.profiles.email,
                    avatar_url: assignee.profiles.avatar_url,
                    id: assignee.profiles.id
                }))
                  : [];


             return {
                ...data,
               assigned_to: Array.isArray(data?.assigned_to_profile) ? data.assigned_to_profile.map((assignee: any) => assignee.profiles.id) : [],
                assigned_to_profile: assignedToProfile,
            } as Task;
        },
        enabled: !!taskId && !!user,
    });


    const handleEditTask = () => {
        setEditModalOpen(true)
    }
    const handleDeleteTask = () => {
        setDeleteModalOpen(true)
    }

    if (isLoading) {
        return <TaskDetailsSkeleton />;
    }

    if (error) {
        return <TaskDetailsError />;
    }

    if (!task) {
         return <TaskDetailsError />;
     }

    const assignedToName = task.assigned_to_profile?.map(assignee => assignee.full_name).join(', ') || null;

    return (
        <Card className="max-w-2xl mx-auto">
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
        </Card>
    );
};

export default TaskDetailsPage;
