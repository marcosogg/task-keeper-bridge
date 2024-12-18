export type FamiliesSchema = {
  Tables: {
    families: {
      Row: {
        id: string;
        name: string;
        created_at: string;
        created_by: string;
      };
      Insert: {
        id?: string;
        name: string;
        created_at?: string;
        created_by: string;
      };
      Update: {
        id?: string;
        name?: string;
        created_at?: string;
        created_by?: string;
      };
      Relationships: [
        {
          foreignKeyName: "families_created_by_fkey";
          columns: ["created_by"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        }
      ];
    };
    family_members: {
      Row: {
        id: string;
        family_id: string;
        profile_id: string;
        role: string;
        status: string;
        joined_at: string | null;
        created_at: string;
      };
      Insert: {
        id?: string;
        family_id: string;
        profile_id: string;
        role?: string;
        status?: string;
        joined_at?: string | null;
        created_at?: string;
      };
      Update: {
        id?: string;
        family_id?: string;
        profile_id?: string;
        role?: string;
        status?: string;
        joined_at?: string | null;
        created_at?: string;
      };
      Relationships: [
        {
          foreignKeyName: "family_members_family_id_fkey";
          columns: ["family_id"];
          isOneToOne: false;
          referencedRelation: "families";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "family_members_profile_id_fkey";
          columns: ["profile_id"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        }
      ];
    };
  };
};