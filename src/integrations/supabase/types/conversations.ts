export type ConversationsSchema = {
  Tables: {
    conversation_members: {
      Row: {
        conversation_id: string;
        created_at: string;
        id: string;
        profile_id: string;
      };
      Insert: {
        conversation_id: string;
        created_at?: string;
        id?: string;
        profile_id: string;
      };
      Update: {
        conversation_id?: string;
        created_at?: string;
        id?: string;
        profile_id?: string;
      };
      Relationships: [
        {
          foreignKeyName: "conversation_members_conversation_id_fkey";
          columns: ["conversation_id"];
          isOneToOne: false;
          referencedRelation: "conversations";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "conversation_members_profile_id_fkey";
          columns: ["profile_id"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        }
      ];
    };
    conversations: {
      Row: {
        created_at: string;
        created_by: string;
        family_id: string;
        id: string;
        name: string | null;
      };
      Insert: {
        created_at?: string;
        created_by: string;
        family_id: string;
        id?: string;
        name?: string | null;
      };
      Update: {
        created_at?: string;
        created_by?: string;
        family_id?: string;
        id?: string;
        name?: string | null;
      };
      Relationships: [
        {
          foreignKeyName: "conversations_created_by_fkey";
          columns: ["created_by"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "conversations_family_id_fkey";
          columns: ["family_id"];
          isOneToOne: false;
          referencedRelation: "families";
          referencedColumns: ["id"];
        }
      ];
    };
    messages: {
      Row: {
        content: string;
        conversation_id: string;
        created_at: string;
        id: string;
        sender_id: string;
        updated_at: string;
      };
      Insert: {
        content: string;
        conversation_id: string;
        created_at?: string;
        id?: string;
        sender_id: string;
        updated_at?: string;
      };
      Update: {
        content?: string;
        conversation_id?: string;
        created_at?: string;
        id?: string;
        sender_id?: string;
        updated_at?: string;
      };
      Relationships: [
        {
          foreignKeyName: "messages_conversation_id_fkey";
          columns: ["conversation_id"];
          isOneToOne: false;
          referencedRelation: "conversations";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "messages_sender_id_fkey";
          columns: ["sender_id"];
          isOneToOne: false;
          referencedRelation: "profiles";
          referencedColumns: ["id"];
        }
      ];
    };
  };
};