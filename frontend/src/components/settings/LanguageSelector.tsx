import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import ErrorText from '../ui/ErrorText/ErrorText.js';
import Select from '../ui/Select/Select.js';
import { AVAILABLE_LANGUAGES } from '../../i18n.js';
import Row from '../ui/Flex/Row.js';
import Col from '../ui/Flex/Col.js';

interface LanguageSelectorProps {
  changeLanguageOfSystem?: boolean;
  initialLanguage?: string;
  value?: string;
  meta?: FieldMetaState<any>;
  onChange?: (language: string) => void;
  [key: string]: any;
}

const LanguageSelector = ({
  changeLanguageOfSystem,
  initialLanguage,
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
      void (changeLanguageOfSystem && i18n.changeLanguage(selectedLanguage));
      onChange && onChange(selectedLanguage);
    }
  };

  const isNotValid = meta?.error?.[0] && meta.touched;

  const options = AVAILABLE_LANGUAGES.map((language) => ({
    title: language.name,
    value: language.value,
    selected: language.value === value,
  }));

  return (
    <>
      <Select
        title={t('settings:general.language')}
        description={t('settings:general.languageDescription')}
        defaultValue={initialLanguage}
        onChange={onLanguageSelectionChange}
        options={options}
        {...rest}
      />
      {isNotValid && (
        <ErrorText>
          {t(`general:fields.validators.${meta.error[0]}`, {
            value: meta.error[1],
          })}
        </ErrorText>
      )}
    </>
  );
};

export default LanguageSelector;
