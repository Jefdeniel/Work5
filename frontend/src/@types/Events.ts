export interface Event {
  id?: number;
  title?: string;
  description?: string;
  start: string | Date;
  end: string | Date;
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
