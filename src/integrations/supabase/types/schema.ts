import type { AuthSchema } from './auth';
import type { ConversationsSchema } from './conversations';
import type { EventsSchema } from './events';
import type { FamiliesSchema } from './families';
import type { NotesSchema } from './notes';
import type { ProfilesSchema } from './profiles';
import type { TasksSchema } from './tasks';
import type { NotificationsSchema } from './notifications';

export type Database = {
  public: AuthSchema &
    ConversationsSchema &
    EventsSchema &
    FamiliesSchema &
    NotesSchema &
    ProfilesSchema &
    TasksSchema &
    NotificationsSchema;
};