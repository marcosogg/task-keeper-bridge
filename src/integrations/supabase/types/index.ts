import { AuthSchema } from './auth';
import { ConversationsSchema } from './conversations';
import { EventsSchema } from './events';
import { FamiliesSchema } from './families';
import { NotesSchema } from './notes';
import { ProfilesSchema } from './profiles';
import { TasksSchema } from './tasks';

export type Database = {
  public: AuthSchema &
    ConversationsSchema &
    EventsSchema &
    FamiliesSchema &
    NotesSchema &
    ProfilesSchema &
    TasksSchema;
};

export * from './base';
export * from './responses';
export * from './auth';
export * from './conversations';
export * from './events';
export * from './families';
export * from './notes';
export * from './profiles';
export * from './tasks';