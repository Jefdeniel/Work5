import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import Select from '../../ui/Select/Select';

interface Props {
  initialValue?: string;
  value?: string;
  onChange: (Theme: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: FieldMetaState<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const OPTIONS = [
  {
    title: 'settings:calendarView.monday',
    value: 1,
  },
  {
    title: 'settings:calendarView.sunday',
    value: 0,
  },
];

const WeekStartsOnSelector = ({
  initialValue,
  value,
  onChange,
  meta,
  ...rest
}: Props) => {
  const { t } = useTranslation(['settings']);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value,
  }));

  return (
    <Select
      title={t('settings:calendarView.weekStartPreference')}
      description={t('settings:calendarView.weekStartPreferenceDescription')}
      defaultValue={initialValue}
      onChange={handleChange}
      options={translatedOptions.map((option) => ({
        ...option,
        value: option.value.toString(),
      }))}
      meta={meta}
      {...rest}
    />
  );
};

export default WeekStartsOnSelector;
