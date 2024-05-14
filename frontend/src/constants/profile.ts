interface actionItem {
  onClick: () => void;
  iconSrc?: string;
  label: string;
}

export const CHANGE_OPTIONS_ITEMS: actionItem[] = [
  {
    onClick: () => console.log('Change options'),
    label: 'Change email',
  },
  {
    onClick: () => console.log('Change options'),
    label: 'Change password',
  },
];

export const CONNECT_ITEMS: actionItem[] = [
  {
    onClick: () => console.log('Slack'),
    iconSrc: '/icons/plus.svg',
    label: 'Slack',
  },
  {
    onClick: () => console.log('Google Calendar'),
    iconSrc: '/icons/plus.svg',
    label: 'Google Calendar',
  },
  {
    onClick: () => console.log('Outlook'),
    iconSrc: '/icons/plus.svg',
    label: 'Outlook',
  },
  {
    onClick: () => console.log('Apple Calendar'),
    iconSrc: '/icons/plus.svg',
    label: 'Apple Calendar',
  },
];
