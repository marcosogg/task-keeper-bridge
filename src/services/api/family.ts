import { Family, FamilyMember } from '@/types/family';
import apiClient from './client';

export const familyService = {
  createFamily: async (data: Partial<Family>) => {
    const response = await apiClient.post<Family>('/families', data);
    return response.data;
  },

  getFamilyById: async (id: string) => {
    const response = await apiClient.get<Family>(`/families/${id}`);
    return response.data;
  },

  updateFamily: async (id: string, data: Partial<Family>) => {
    const response = await apiClient.put<Family>(`/families/${id}`, data);
    return response.data;
  },

  inviteMember: async (familyId: string, email: string, role: FamilyMember['role']) => {
    const response = await apiClient.post<FamilyMember>(`/families/${familyId}/invites`, {
      email,
      role,
    });
    return response.data;
  },
};