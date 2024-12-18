import { Event } from '@/types/event';
import apiClient from './client';

export const eventService = {
  createEvent: async (data: Partial<Event>) => {
    const response = await apiClient.post<Event>('/events', data);
    return response.data;
  },

  getEventById: async (id: string) => {
    const response = await apiClient.get<Event>(`/events/${id}`);
    return response.data;
  },

  updateEvent: async (id: string, data: Partial<Event>) => {
    const response = await apiClient.put<Event>(`/events/${id}`, data);
    return response.data;
  },

  deleteEvent: async (id: string) => {
    await apiClient.delete(`/events/${id}`);
  },

  getFamilyEvents: async (familyId: string) => {
    const response = await apiClient.get<Event[]>(`/families/${familyId}/events`);
    return response.data;
  },
};