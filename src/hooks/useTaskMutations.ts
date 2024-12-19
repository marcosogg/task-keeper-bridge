import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

export const useTaskMutations = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const invalidateTaskQueries = () => {
    // Invalidate task list
    queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
    
    // Invalidate quick stats
    queryClient.invalidateQueries({ queryKey: ['quickStats', user?.id] });
    
    // Invalidate family stats
    queryClient.invalidateQueries({ queryKey: ['familyStats', user?.id] });
    
    // Invalidate family overview
    queryClient.invalidateQueries({ queryKey: ['familyOverview', user?.id] });
    
    // Invalidate priority items
    queryClient.invalidateQueries({ queryKey: ['priorityItems', user?.id] });
  };

  return {
    invalidateTaskQueries,
  };
};
