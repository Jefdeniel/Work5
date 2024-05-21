import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import Select from '../../ui/Select/Select';

interface Props {
  initialValue?: boolean;
  value?: boolean;
  onChange: (Theme: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: FieldMetaState<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const OPTIONS = [
  {
    title: 'settings:calendarView.show',
    value: true,
  },
  {
    title: 'settings:calendarView.dontShow',
    value: false,
  },
];

const WeekendVisbilityOnSelector = ({
  initialValue,
  value,
  onChange,
  meta,
  ...rest
}: Props) => {
  const { t } = useTranslation(['settings']);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value === 'true');
  };

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value,
    selected: option.value === value,
  }));

  return (
    <Select
      title={t('settings:calendarView.weekendVisibilityToggle')}
      description={t(
        'settings:calendarView.weekendVisibilityToggleDescription'
      )}
      defaultValue={initialValue}
      onChange={handleChange}
      options={translatedOptions}
      meta={meta}
      {...rest}
    />
  );
};

export default WeekendVisbilityOnSelector;
