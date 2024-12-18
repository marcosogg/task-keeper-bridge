export type NotesSchema = {
  Tables: {
    notes: {
      Row: {
        id: string;
        title: string | null;
        content: string;
        is_checklist: boolean;
        created_by: string;
        family_id: string;
        created_at: string;
        updated_at: string;
      };
      Insert: {
        id?: string;
        title?: string | null;
        content: string;
        is_checklist?: boolean;
        created_by: string;
        family_id: string;
        created_at?: string;
        updated_at?: string;
      };
      Update: {
        id?: string;
        title?: string | null;
        content?: string;
        is_checklist?: boolean;
        created_by?: string;
        family_id?: string;
        created_at?: string;
        updated_at?: string;
      };
      Relationships: [
        {
          foreignKeyName: "notes_created_by_fkey";
          columns: ["created_by"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "notes_family_id_fkey";
          columns: ["family_id"];
          isOneToOne: false;
          referencedRelation: "families";
          referencedColumns: ["id"];
        }
      ];
    };
  };
};