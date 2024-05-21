import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import Select from '../../ui/Select/Select';

interface ThemeSelectorProps {
  initialValue?: string;
  value?: string;
  onChange: (Theme: string) => void;
  meta?: FieldMetaState<any>;
  [x: string]: any;
}

const OPTIONS = [
  {
    title: 'settings:general.light',
    value: 'light',
  },
  {
    title: 'settings:general.dark',
    value: 'dark',
  },
];

const ThemeSelector = ({
  initialValue,
  value,
  onChange,
  meta,
  ...rest
}: ThemeSelectorProps) => {
  const { t } = useTranslation(['settings']);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value,
    selected: option.value === value,
  }));

  return (
    <Select
      title={t('settings:general.theme')}
      description={t('settings:general.themeDescription')}
      defaultValue={initialValue}
      onChange={handleThemeChange}
      options={translatedOptions}
      meta={meta}
      {...rest}
    />
  );
};

export default ThemeSelector;
