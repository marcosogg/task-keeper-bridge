import { Note } from '@/types/note';
import apiClient from './client';

export const noteService = {
  createNote: async (data: Partial<Note>) => {
    const response = await apiClient.post<Note>('/notes', data);
    return response.data;
  },

  getNoteById: async (id: string) => {
    const response = await apiClient.get<Note>(`/notes/${id}`);
    return response.data;
  },

  updateNote: async (id: string, data: Partial<Note>) => {
    const response = await apiClient.put<Note>(`/notes/${id}`, data);
    return response.data;
  },

  deleteNote: async (id: string) => {
    await apiClient.delete(`/notes/${id}`);
  },

  getFamilyNotes: async (familyId: string) => {
    const response = await apiClient.get<Note[]>(`/families/${familyId}/notes`);
    return response.data;
  },

  togglePinNote: async (id: string, pinned: boolean) => {
    const response = await apiClient.patch<Note>(`/notes/${id}/pin`, { pinned });
    return response.data;
  },
};