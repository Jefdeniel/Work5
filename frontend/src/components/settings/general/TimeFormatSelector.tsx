import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import Select from '../../ui/Select/Select';

interface TimeFormatSelectorProps {
  initialValue?: string;
  value?: string;
  onChange: (timeFormat: string) => void;
  meta?: FieldMetaState<any>;
  [x: string]: any;
}

const OPTIONS = [
  {
    value: '12h',
    title: 'settings:general.12Hour',
  },
  {
    value: '24h',
    title: 'settings:general.24Hour',
  },
];

const TimeFormatSelector = ({
  initialValue,
  value,
  onChange,
  meta,
  ...rest
}: TimeFormatSelectorProps) => {
  const { t } = useTranslation(['settings']);

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value,
    selected: option.value === value,
  }));

  const handleTimeFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <Select
      title={t('settings:general.timeFormat')}
      defaultValue={initialValue}
      onChange={handleTimeFormatChange}
      description={t('settings:general.timeFormatDescription')}
      options={translatedOptions}
      meta={meta}
      {...rest}
    />
  );
};

export default TimeFormatSelector;
