import { supabase } from '@/integrations/supabase/client';
import { Family, FamilyMember } from '@/types/family';

export const familyService = {
  async createFamily(name: string, userId: string): Promise<Family> {
    const { data, error } = await supabase
      .from('families')
      .insert([
        {
          name,
          created_by: userId,
        },
      ])
      .select('*, creator:profiles(full_name, email, avatar_url)')
      .single();

    if (error) throw error;
    return data;
  },

  async addFamilyMember(familyId: string, profileId: string, role: string = 'member'): Promise<FamilyMember> {
    const { data, error } = await supabase
      .from('family_members')
      .insert([
        {
          family_id: familyId,
          profile_id: profileId,
          role,
          status: 'active',
        },
      ])
      .select('*, profiles(full_name, email, avatar_url), families(name, id)')
      .single();

    if (error) throw error;
    return data;
  },

  async getFamilyMembers(familyId: string): Promise<FamilyMember[]> {
    const { data, error } = await supabase
      .from('family_members')
      .select('*, profiles(full_name, email, avatar_url), families(name, id)')
      .eq('family_id', familyId);

    if (error) throw error;
    return data;
  },

  async getUserFamilies(userId: string): Promise<Family[]> {
    const { data, error } = await supabase
      .from('family_members')
      .select('families(*, creator:profiles(full_name, email, avatar_url))')
      .eq('profile_id', userId);

    if (error) throw error;
    return data.map((item) => item.families);
  },

  async getFamilyById(familyId: string): Promise<Family> {
    const { data, error } = await supabase
      .from('families')
      .select('*, creator:profiles(full_name, email, avatar_url)')
      .eq('id', familyId)
      .single();

    if (error) throw error;
    return data;
  },
};
