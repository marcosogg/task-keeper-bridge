import { supabase } from '@/lib/supabase';
import { Task } from '@/types/task';

export const taskService = {
  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'assigned_to_profile'>) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select('*, assigned_to_profile:profiles(full_name, email, avatar_url)')
      .single();

    if (error) throw error;
    return data;
  },

  async updateTask(taskId: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select('*, assigned_to_profile:profiles(full_name, email, avatar_url)')
      .single();

    if (error) throw error;
    return data;
  },

  async assignTask(taskId: string, assignedTo: string | null) {
    return this.updateTask(taskId, { assigned_to: assignedTo });
  },

  async getFamilyTasks(familyId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*, assigned_to_profile:profiles(full_name, email, avatar_url)')
      .eq('family_id', familyId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getAssignedTasks(profileId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*, assigned_to_profile:profiles(full_name, email, avatar_url)')
      .eq('assigned_to', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async completeTask(taskId: string) {
    return this.updateTask(taskId, { 
      status: 'completed', 
      completed_at: new Date().toISOString() 
    });
  },

  async deleteTask(taskId: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw error;
  }
};
