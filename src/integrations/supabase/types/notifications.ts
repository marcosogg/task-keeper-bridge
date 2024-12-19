export type NotificationsSchema = {
  Tables: {
    notifications: {
      Row: {
        id: string;
        type: string;
        title: string;
        message: string;
        related_id: string | null;
        profile_id: string;
        family_id: string;
        read: boolean | null;
        created_at: string;
        updated_at: string;
      };
      Insert: {
        id?: string;
        type: string;
        title: string;
        message: string;
        related_id?: string | null;
        profile_id: string;
        family_id: string;
        read?: boolean | null;
        created_at?: string;
        updated_at?: string;
      };
      Update: {
        id?: string;
        type?: string;
        title?: string;
        message?: string;
        related_id?: string | null;
        profile_id?: string;
        family_id?: string;
        read?: boolean | null;
        created_at?: string;
        updated_at?: string;
      };
      Relationships: [
        {
          foreignKeyName: "notifications_family_id_fkey";
          columns: ["family_id"];
          isOneToOne: false;
          referencedRelation: "families";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "notifications_profile_id_fkey";
          columns: ["profile_id"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        }
      ];
    };
  };
};