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
}

export interface CalendarUser {
  id?: number;
  user: number;
  calendar: {
    id: number;
    title: string;
    description?: string;
    img?: string | null;
    owner_id?: number;
    users?: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      permissions: {
        can_view_event_details: boolean;
        can_create_events: boolean;
        can_edit_events: boolean;
        can_delete_events: boolean;
        can_invite_others: boolean;
      };
    }[];
    date_start?: Date;
    date_stop?: Date;
  };
  role: string;
  created_at?: string;
  first_name?: string;
  avatar?: string;
}

export interface ExportOption {
  calendar: Calendar;
}

export interface Category {
  id: number;
  calendar: Calendar;
  title: string;
  color_code: string;
}
