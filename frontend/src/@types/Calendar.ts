export interface CalendarUser {
  id?: number;
  user: number;
  calendar: number;
  role: string;
  created_at?: string;
}

export interface Calendar {
  id?: number;
  name: string;
  description?: string;
  color?: string;
  user: number;
  created_at?: string;
}
