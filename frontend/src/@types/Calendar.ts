export interface Calendar {
  id?: number;
  title: string;
  description?: string;
  owner_id?: string;
  color?: string;
  img?: string | null;
  date_start?: string;
  date_stop?: string;
}
export interface CalendarUser {
  id?: number;
  user: number;
  calendar: Calendar;
  role: string;
  created_at?: string;
}

export interface ExportOption {
  calendar: Calendar;
}
