import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITimezone, ITimezoneOption } from 'react-timezone-select';
interface SettingsContextType {
  language?: string;
  setLanguage: (lang: string) => void;
  selectedTimezone?: string | ITimezoneOption;
  setSelectedTimezone: (selectedTimezone: string) => void;
  timeFormat?: string;
  setTimeFormat: (timeFormat: string) => void;
  theme?: string;
  setTheme: (theme: string) => void;
  weekStartsOn?: number;
  setWeekStartsOn: (weekStartsOn: number) => void;
  weekendVisibility?: boolean;
  setWeekendVisibility: (weekendVisibility: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  language: 'nl',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLanguage: () => {},
  selectedTimezone: 'UTC',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedTimezone: () => {},
  timeFormat: '24h',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTimeFormat: () => {},
  theme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
  weekStartsOn: 1,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWeekStartsOn: () => {},
  weekendVisibility: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWeekendVisibility: () => {},
});

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language || 'nl');
  // initial timezone is the timezone of the user's browser
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [timeFormat, setTimeFormat] = useState<string>('24h');
  const [theme, setTheme] = useState<string>('light');
  const [weekStartsOn, setWeekStartsOn] = useState<number>(1);
  const [weekendVisibility, setWeekendVisibility] = useState<boolean>(true);

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [i18n, language]);

  const contextValue: SettingsContextType = {
    language,
    setLanguage,
    selectedTimezone,
    setSelectedTimezone,
    timeFormat,
    setTimeFormat,
    theme,
    setTheme,
    weekStartsOn,
    setWeekStartsOn,
    weekendVisibility,
    setWeekendVisibility,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
