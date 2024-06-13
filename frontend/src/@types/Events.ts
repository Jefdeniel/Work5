export interface Event {
  id?: number;
  title?: string;
  description?: string;
  start_time: Date;
  end_time: Date;
  is_recurring?: boolean;
  location?: string;
  priority?: string;
  recurrence_days_of_week?: string;
  recurrence_end_date?: string;
  recurrence_interval?: number;
  status?: string;
  allDay?: boolean; // ADD TO DATABASE
  color?: string;
  htmlLink?: string;
}

export interface GoogleEvent {
  id: string;
  summary?: string;
  start?: {
    date?: string;
    dateTime?: string;
  };
  end?: {
    date?: string;
    dateTime?: string;
  };
  location?: string;
  status?: string;
  htmlLink?: string;
}
