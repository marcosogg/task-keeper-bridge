import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          conversation_members(
            profile:profiles(*)
          ),
          messages(
            *,
            sender:profiles(*)
          )
        `)
        .order("created_at", { foreignTable: "messages", ascending: false });

      if (error) throw error;
      return data;
    },
  });
};