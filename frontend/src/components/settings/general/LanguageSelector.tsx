import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from '../../../i18n.js';
import Select from '../../ui/Select/Select.js';

interface LanguageSelectorProps {
  changeLanguage?: boolean;
  initialValue?: string;
  value?: string;
  meta?: FieldMetaState<any>;
  onChange?: (language: string) => void;
  [key: string]: any;
}

const LanguageSelector = ({
  changeLanguage,
  initialValue,
  value,
  meta,
  onChange,
  ...rest
}: LanguageSelectorProps) => {
  const { t } = useTranslation(['settings']);
  const { i18n } = useTranslation();

  const onLanguageSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = e.target.value;

    if (selectedLanguage) {
      void (changeLanguage && i18n.changeLanguage(selectedLanguage));
      onChange && onChange(selectedLanguage);
    }
  };

  const options = AVAILABLE_LANGUAGES.map((language) => ({
    title: language.name,
    value: language.value,
  }));

  return (
    <Select
      title={t('settings:general.language')}
      description={t('settings:general.languageDescription')}
      defaultValue={initialValue}
      onChange={onLanguageSelectionChange}
      options={options}
      {...rest}
    />
  );
};

export default LanguageSelector;
