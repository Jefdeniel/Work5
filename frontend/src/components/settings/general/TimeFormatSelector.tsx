import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import Select from '../../ui/Select/Select';

interface TimeFormatSelectorProps {
  initialDisplay?: string;
  value?: string;
  onChange: (timeFormat: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: FieldMetaState<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const OPTIONS = [
  {
    title: 'settings:general.12Hour',
    value: '12h',
  },
  {
    title: 'settings:general.24Hour',
    value: '24h',
  },
];

const TimeFormatSelector = ({
  initialDisplay,
  value,
  onChange,
  meta,
  ...rest
}: TimeFormatSelectorProps) => {
  const { t } = useTranslation(['settings']);

  const handleTimeFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value,
    selected: option.value === value,
  }));

  return (
    <Select
      title={t('settings:general.timeFormat')}
      description={t('settings:general.timeFormatDescription')}
      defaultValue={initialDisplay}
      onChange={handleTimeFormatChange}
      options={translatedOptions.map((option) => ({
        ...option,
        value: option.value.toString(),
      }))}
      meta={meta}
      {...rest}
    />
  );
};

export default TimeFormatSelector;
