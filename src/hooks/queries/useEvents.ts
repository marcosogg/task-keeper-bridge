import { useQuery } from "@tanstack/react-query";
import { eventService } from "@/services/api/events";
import type { Event } from "@/types/event";

export const useEvents = (familyId: string) => {
  return useQuery({
    queryKey: ['events', familyId],
    queryFn: () => eventService.getFamilyEvents(familyId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data: Event[]) => {
      return data.sort((a, b) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    },
  });
};