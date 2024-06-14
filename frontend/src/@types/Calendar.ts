import { TimeBlock } from './TimeBlock';

export interface Calendar {
  id?: number;
  title: string;
  description?: string;
  color?: string;
  image?: string | null;
  owner_id?: number;
  date_start?: Date;
  date_stop?: Date;
  users?: CalendarUser[];
  categories?: Category[];
  timeblocks?: TimeBlock[];
}

export interface CalendarUser {
  id?: string;
  user: string;
  calendar: Calendar;
  role: string;
  created_at?: string;
  first_name?: string;
  avatar?: string;
}

// Type 'Calendar' is missing the following properties from type 'CalendarUser': user, calendar, rolets(2739)

export interface ExportOption {
  calendar: Calendar;
}

export interface Category {
  id: number;
  calendar: Calendar;
  title: string;
  color_code: string;
}
