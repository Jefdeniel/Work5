interface actionItem {
  onClick: () => void;
  iconSrc?: string;
  label: string;
}

export const EXPORT_AGENDA_ITEMS: actionItem[] = [
  {
    onClick: () => console.log('pdf'),
    label: 'PDF',
  },
  {
    onClick: () => console.log('excel sheet'),
    label: 'Excel sheet',
  },
];

export const EXTERNAL_SERVICES_ITEMS: actionItem[] = [
  {
    onClick: () => console.log('Slack'),
    iconSrc: '/icons/companies/slack-white.svg',
    label: 'Slack',
  },
  {
    onClick: () => console.log('Microsoft Teams'),
    iconSrc: '/icons/companies/teams.svg',
    label: 'Google Calendar',
  },
  {
    onClick: () => console.log('Apple Agenda'),
    iconSrc: '/icons/companies/apple-white.svg',
    label: 'Apple Agenda',
  },
];
