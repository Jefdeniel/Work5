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

// https://learn.microsoft.com/en-us/graph/api/resources/calendar?view=graph-rest-1.0,
// https://powerusers.microsoft.com/t5/General-Power-Automate/Easiuest-way-to-get-calendar-id-for-the-Office-365-Calendar/m-p/164465#M33691
// check owner TS?
export interface OutlookCalendar {
  id: string;
  allowedOnlineMeetingProviders: ['string'];
  canEdit: boolean;
  canShare: boolean;
  canViewPrivateItems: boolean;
  changeKey: string;
  color: string;
  defaultOnlineMeetingProvider: string;
  hexColor: string;
  isDefaultCalendar: boolean;
  isRemovable: boolean;
  isTallyingResponses: boolean;
  name: string;
  owner: { '@odata.type': 'microsoft.graph.emailAddress' };
}
