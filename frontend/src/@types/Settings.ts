export interface Settings {}

export interface AccountSettings {
  username: string;
  repeatUsername: string;
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

export interface UserSettings {
  language: string;
  timezone: string;
  timeFormat: string;
  theme: string;
  weekStartsOn: string;
  weekendVisibility: boolean;
  eventReminderEnabled: boolean;
  activityNotificationEnabled: boolean;
}
