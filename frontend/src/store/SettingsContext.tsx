import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITimezone, ITimezoneOption } from 'react-timezone-select';
import { UserSettings } from '../@types/Settings';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

interface SettingsContextType {
  language?: string;
  setLanguage: (lang: string) => void;
  time_zone?: string | ITimezoneOption;
  setTimezone: (selectedTimezone: string) => void;
  time_format?: string;
  setTimeFormat: (time_format: string) => void;
  theme?: string;
  setTheme: (theme: string) => void;
  week_start_day?: string;
  setWeekStartsOn: (week_start_day: string) => void;
  weekend_visibility?: boolean;
  setWeekendVisibility: (weekend_visibility: boolean) => void;
  event_reminder?: boolean;
  setEventReminderEnabled: (event_reminder: boolean) => void;
  activity_notifications?: boolean;
  setActivityNotificationEnabled: (activity_notifications: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  language: 'nl',
  setLanguage: () => {},
  time_zone: 'UTC',
  setTimezone: () => {},
  time_format: '24h',
  setTimeFormat: () => {},
  theme: 'light',
  setTheme: () => {},
  week_start_day: 'Monday',
  setWeekStartsOn: () => {},
  weekend_visibility: true,
  setWeekendVisibility: () => {},
  event_reminder: true,
  setEventReminderEnabled: () => {},
  activity_notifications: true,
  setActivityNotificationEnabled: () => {},
});

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = useAuth();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language || 'nl');
  const [time_zone, setTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ); // initial timezone is the timezone of the user's browser
  const [time_format, setTimeFormat] = useState<string>('24h');
  const [theme, setTheme] = useState<string>('light');
  const [week_start_day, setWeekStartsOn] = useState<string>('Monday');
  const [weekend_visibility, setWeekendVisibility] = useState<boolean>(true);
  const [event_reminder, setEventReminderEnabled] = useState(true);
  const [activity_notifications, setActivityNotificationEnabled] =
    useState(true);

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [i18n, language]);

  const { fetchData: getUserSettings } = useFetch('GET', [
    'user_settings',
    auth.user_id ? auth.user_id.toString() : '',
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserSettings();

      if (response.ok) {
        const data = (await response.json()) as UserSettings;

        setLanguage(data.language);
        setTimezone(data.time_zone);
        setTimeFormat(data.time_format);
        setTheme(data.theme);
        setWeekStartsOn(data.week_start_day);
        setWeekendVisibility(data.weekend_visibility);
        setEventReminderEnabled(data.event_reminder);
        setActivityNotificationEnabled(data.activity_notifications);
      }
    };

    language && void fetchData();
  }, [
    auth.user_id,
    language,
    time_zone,
    time_format,
    theme,
    week_start_day,
    weekend_visibility,
    event_reminder,
    activity_notifications,
  ]);

  const contextValue: SettingsContextType = {
    language,
    setLanguage,
    time_zone,
    setTimezone,
    time_format,
    setTimeFormat,
    theme,
    setTheme,
    week_start_day,
    setWeekStartsOn,
    weekend_visibility,
    setWeekendVisibility,
    event_reminder,
    setEventReminderEnabled,
    activity_notifications,
    setActivityNotificationEnabled,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
