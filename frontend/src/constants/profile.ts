export interface ActionItem {
  onClick: string;
  iconSrc?: string;
  label: string;
}

export const CHANGE_OPTIONS_ITEMS: ActionItem[] = [
  {
    onClick: 'openEditEmailModal',
    label: 'Change email',
  },
  {
    onClick: 'openEditPasswordModal',
    label: 'Change password',
  },
];

export const CONNECT_ITEMS: ActionItem[] = [
  {
    onClick: 'handleSlackClick',
    iconSrc: '/icons/companies/slack.svg',
    label: 'Slack',
  },
  {
    onClick: 'handleGoogleCalendarClick',
    iconSrc: '/icons/companies/google.svg',
    label: 'Google Calendar',
  },
  {
    onClick: 'handleOutlookClick',
    iconSrc: '/icons/companies/outlook.svg',
    label: 'Outlook',
  },
  {
    onClick: 'handleAppleCalendarClick',
    iconSrc: '/icons/companies/apple.svg',
    label: 'Apple Calendar',
  },
];
