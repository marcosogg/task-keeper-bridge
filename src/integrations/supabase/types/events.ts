export type EventsSchema = {
  Tables: {
    events: {
      Row: {
        id: string;
        title: string;
        description: string | null;
        start_date: string;
        end_date: string | null;
        location: string | null;
        created_by: string;
        family_id: string;
        created_at: string;
        updated_at: string;
      };
      Insert: {
        id?: string;
        title: string;
        description?: string | null;
        start_date: string;
        end_date?: string | null;
        location?: string | null;
        created_by: string;
        family_id: string;
        created_at?: string;
        updated_at?: string;
      };
      Update: {
        id?: string;
        title?: string;
        description?: string | null;
        start_date?: string;
        end_date?: string | null;
        location?: string | null;
        created_by?: string;
        family_id?: string;
        created_at?: string;
        updated_at?: string;
      };
      Relationships: [
        {
          foreignKeyName: "events_created_by_fkey";
          columns: ["created_by"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "events_family_id_fkey";
          columns: ["family_id"];
          isOneToOne: false;
          referencedRelation: "families";
          referencedColumns: ["id"];
        }
      ];
    };
  };
};