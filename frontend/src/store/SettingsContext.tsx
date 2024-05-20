import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITimezone, ITimezoneOption } from 'react-timezone-select';
interface SettingsContextType {
  language?: string;
  setLanguage: (lang: string) => void;
  timezone?: string | ITimezoneOption;
  setTimezone: (selectedTimezone: string) => void;
  timeFormat?: string;
  setTimeFormat: (timeFormat: string) => void;
  theme?: string;
  setTheme: (theme: string) => void;
  weekStartsOn?: string;
  setWeekStartsOn: (weekStartsOn: string) => void;
  weekendVisibility?: boolean;
  setWeekendVisibility: (weekendVisibility: boolean) => void;
  eventReminderEnabled?: boolean;
  setEventReminderEnabled: (eventReminderEnabled: boolean) => void;
  activityNotificationEnabled?: boolean;
  setActivityNotificationEnabled: (
    activityNotificationEnabled: boolean
  ) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  language: 'nl',
  setLanguage: () => {},
  timezone: 'UTC',
  setTimezone: () => {},
  timeFormat: '24h',
  setTimeFormat: () => {},
  theme: 'light',
  setTheme: () => {},
  weekStartsOn: 'Monday',
  setWeekStartsOn: () => {},
  weekendVisibility: true,
  setWeekendVisibility: () => {},
  eventReminderEnabled: true,
  setEventReminderEnabled: () => {},
  activityNotificationEnabled: true,
  setActivityNotificationEnabled: () => {},
});

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language || 'nl');
  const [timezone, setTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ); // initial timezone is the timezone of the user's browser
  const [timeFormat, setTimeFormat] = useState<string>('24h');
  const [theme, setTheme] = useState<string>('light');
  const [weekStartsOn, setWeekStartsOn] = useState<string>('Monday');
  const [weekendVisibility, setWeekendVisibility] = useState<boolean>(true);
  const [eventReminderEnabled, setEventReminderEnabled] = useState(true);
  const [activityNotificationEnabled, setActivityNotificationEnabled] =
    useState(true);

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [i18n, language]);

  const contextValue: SettingsContextType = {
    language,
    setLanguage,
    timezone,
    setTimezone,
    timeFormat,
    setTimeFormat,
    theme,
    setTheme,
    weekStartsOn,
    setWeekStartsOn,
    weekendVisibility,
    setWeekendVisibility,
    eventReminderEnabled,
    setEventReminderEnabled,
    activityNotificationEnabled,
    setActivityNotificationEnabled,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
