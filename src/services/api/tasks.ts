import { Task, TaskComment } from '@/types/task';
import apiClient from './client';

export const taskService = {
  createTask: async (data: Partial<Task>) => {
    const response = await apiClient.post<Task>('/tasks', data);
    return response.data;
  },

  getTaskById: async (id: string) => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  updateTask: async (id: string, data: Partial<Task>) => {
    const response = await apiClient.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: string) => {
    await apiClient.delete(`/tasks/${id}`);
  },

  addComment: async (taskId: string, content: string) => {
    const response = await apiClient.post<TaskComment>(`/tasks/${taskId}/comments`, {
      content,
    });
    return response.data;
  },
};