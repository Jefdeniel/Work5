export interface CalendarEvent {
  id?: number;
  title?: string;
  start: string | Date;
  end: string | Date;
  allDay?: boolean;
  is_new?: boolean;
  color?: string;
}
