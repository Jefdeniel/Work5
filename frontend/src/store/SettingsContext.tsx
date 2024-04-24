import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
interface SettingsContextType {
  language?: string;
  setLanguage: (lang: string) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  language: 'nl',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLanguage: () => {},
});

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language || 'nl');

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [i18n, language]);

  const contextValue: SettingsContextType = {
    language,
    setLanguage,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
