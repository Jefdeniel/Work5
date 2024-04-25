import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITimezone, ITimezoneOption } from 'react-timezone-select';
interface SettingsContextType {
  language?: string;
  setLanguage: (lang: string) => void;
  selectedTimezone?: string | ITimezoneOption;
  setSelectedTimezone: (selectedTimezone: string) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  language: 'nl',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLanguage: () => {},
  selectedTimezone: 'UTC',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedTimezone: () => {},
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

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [i18n, language]);

  const contextValue: SettingsContextType = {
    language,
    setLanguage,
    selectedTimezone,
    setSelectedTimezone,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
