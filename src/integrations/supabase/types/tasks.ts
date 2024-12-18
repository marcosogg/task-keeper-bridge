export type TasksSchema = {
  Tables: {
    tasks: {
      Row: {
        id: string;
        title: string;
        description: string | null;
        status: string;
        priority: string;
        due_date: string | null;
        assigned_to: string | null;
        created_by: string;
        family_id: string;
        created_at: string;
        updated_at: string;
        completed_at: string | null;
      };
      Insert: {
        id?: string;
        title: string;
        description?: string | null;
        status?: string;
        priority?: string;
        due_date?: string | null;
        assigned_to?: string | null;
        created_by: string;
        family_id: string;
        created_at?: string;
        updated_at?: string;
        completed_at?: string | null;
      };
      Update: {
        id?: string;
        title?: string;
        description?: string | null;
        status?: string;
        priority?: string;
        due_date?: string | null;
        assigned_to?: string | null;
        created_by?: string;
        family_id?: string;
        created_at?: string;
        updated_at?: string;
        completed_at?: string | null;
      };
      Relationships: [
        {
          foreignKeyName: "tasks_assigned_to_fkey";
          columns: ["assigned_to"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "tasks_created_by_fkey";
          columns: ["created_by"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "tasks_family_id_fkey";
          columns: ["family_id"];
          isOneToOne: false;
          referencedRelation: "families";
          referencedColumns: ["id"];
        }
      ];
    };
  };
};