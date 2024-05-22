export interface CalendarEvent {
  id: number;
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  is_new?: boolean;
  color?: string;
}
