import { ITimezoneOption } from 'react-timezone-select';

export interface AccountSettings {
  email?: string;
  password?: string;
}

export interface UserSettings {
  language: string;
  time_zone: string | ITimezoneOption;
  time_format: string;
  theme: string;
  week_start_day: string;
  weekend_visibility: boolean;
  event_reminder: boolean;
  activity_notifications: boolean;
}
