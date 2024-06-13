import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import Select from '../../../ui/Select/Select';

interface Props {
  initialValue?: string;
  value?: string;
  onChange: (priority: string) => void;
  meta?: FieldMetaState<any>;
  [x: string]: any;
}

const OPTIONS = [
  {
    title: 'events:eventInfo.priorityOptions.very_low',
    value: 'very_low',
  },
  {
    title: 'events:eventInfo.priorityOptions.low',
    value: 'low',
  },
  {
    title: 'events:eventInfo.priorityOptions.medium',
    value: 'medium',
  },
  {
    title: 'events:eventInfo.priorityOptions.high',
    value: 'high',
  },
  {
    title: 'events:eventInfo.priorityOptions.very_high',
    value: 'very_high',
  },
];

const EventPrioritySelector = ({
  initialValue,
  value,
  onChange,
  meta,
  ...rest
}: Props) => {
  const { t } = useTranslation(['events']);

  // NOTE: Set the default value to 'medium' if no value is provided
  useEffect(() => {
    if (!value) {
      onChange('medium');
    }
  }, [value, onChange]);

  const translatedOptions = OPTIONS.map((option) => ({
    title: t(option.title),
    value: option.value,
    selected: option.value === value,
  }));

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <Select
      defaultValue={initialValue || 'medium'}
      title={t('events:eventInfo.priority')}
      value={value || 'medium'}
      onChange={handlePriorityChange}
      options={translatedOptions}
      meta={meta}
      {...rest}
    />
  );
};

export default EventPrioritySelector;
