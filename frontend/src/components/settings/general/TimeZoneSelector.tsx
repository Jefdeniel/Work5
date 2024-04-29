import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { allTimezones } from 'react-timezone-select';
import Select from '../../ui/Select/Select';

interface TimeZoneSelectorProps {
  changeTimeZone?: boolean;
  initialTimeZone?: Object;
  value?: string | Object;
  meta?: FieldMetaState<any>;
  onChange?: (language: string) => void;
  [key: string]: any;
}

const TimeZoneSelector = ({
  changeTimeZone = false,
  initialTimeZone = 'UTC',
  value,
  meta,
  onChange,
  ...rest
}: TimeZoneSelectorProps) => {
  const { t } = useTranslation(['settings']);

  const onTimeZoneSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTimeZone = e.target.value;

    if (selectedTimeZone !== initialTimeZone) {
      changeTimeZone && onChange && onChange(selectedTimeZone);
    }
  };

  const options = Object.keys(allTimezones).map((timezone) => ({
    title: timezone.replace(/_/g, ' '),
    value: timezone,
    selected: timezone === value,
  }));

  return (
    <Select
      title={t('settings:general.timeZone')}
      description={t('settings:general.timeZoneDescription')}
      defaultValue={initialTimeZone}
      onChange={onTimeZoneSelectionChange}
      options={options}
      {...rest}
    />
  );
};

export default TimeZoneSelector;
