export interface Notification {
  id?: number;
  title: string;
  user_id: number;
  date_start: string;
  date_stop: string;
  is_new: boolean;
}

// NOTE: ISO 8601 format string, not date object
