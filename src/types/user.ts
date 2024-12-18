export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: 'parent' | 'child' | 'guardian';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  phoneNumber?: string;
  timezone?: string;
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  taskReminders: boolean;
  eventReminders: boolean;
}