export interface Event {
  id?: number;
  title?: string;
  start: string | Date;
  end: string | Date;
  location?: string;
  status?: string;
  priority?: string;
  allDay?: boolean;
  is_new?: boolean;
  color?: string;
}
