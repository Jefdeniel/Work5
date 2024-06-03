interface actionItem {
  onClick: string; // Use string to refer to the function name
  iconSrc?: string;
  label: string;
}

export const EXPORT_AGENDA_ITEMS: actionItem[] = [
  {
    onClick: 'exportAsPDF',
    label: 'PDF',
  },
  {
    onClick: 'openExcelModal',
    label: 'Excel sheet',
  },
];

export const EXTERNAL_SERVICES_ITEMS: actionItem[] = [
  {
    onClick: 'handleSlackClick',
    iconSrc: '/icons/companies/slack-white.svg',
    label: 'Slack',
  },
  {
    onClick: 'handleGoogleCalendarClick',
    iconSrc: '/icons/companies/teams.svg',
    label: 'Google Calendar',
  },
  {
    onClick: 'handleOutlookClick',
    iconSrc: '/icons/companies/apple-white.svg',
    label: 'Apple Agenda',
  },
];
