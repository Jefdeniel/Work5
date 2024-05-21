import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { ITimezoneOption, allTimezones } from 'react-timezone-select';
import Select from '../../ui/Select/Select';

interface TimeZoneSelectorProps {
  initialValue?: string | ITimezoneOption;
  value?: string;
  meta?: FieldMetaState<any>;
  onChange?: (timezone: string) => void;
  [key: string]: any;
}

const TimeZoneSelector = ({
  initialValue,
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
    onChange && onChange(selectedTimeZone);
  };

  const options = Object.keys(allTimezones).map((timezone) => ({
    title: timezone.replace(/_/g, ' '),
    value: timezone,
  }));

  return (
    <Select
      title={t('settings:general.timeZone')}
      description={t('settings:general.timeZoneDescription')}
      value={value}
      onChange={onTimeZoneSelectionChange}
      options={options}
      meta={meta}
      {...rest}
    />
  );
};

export default TimeZoneSelector;
