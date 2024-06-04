export interface Calendar {
  id?: number;
  title: string;
  description?: string;
  color?: string;
  image?: string | null;
  owner_id: number;
  date_start?: Date;
  date_stop?: Date;
}
export interface CalendarUser {
  id?: number;
  user: number;
  calendar: Calendar;
  role: string;
  created_at?: string;
}
