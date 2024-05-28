import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../ui/Input/Input';

interface Props {
  changeValue?: string;
  intitialValue?: string;
  value?: string;
  meta: FieldMetaState<string>; // or any?
  onChange?: (value: string) => void;
  [key: string]: any;
}

const EventDescriptionSelector = ({
  changeValue,
  intitialValue,
  value,
  meta,
  onChange,
  ...rest
}: Props) => {
  const { t } = useTranslation(['events']);

  const onEventDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <Input
      title={t('events:eventInfo.description')}
      type="text"
      defaultValue={intitialValue}
      value={value} // not sure about this, can fix edit event modal
      onChange={onEventDescriptionChange}
      meta={meta}
      disableSpacing
      {...rest}
    />
  );
};

export default EventDescriptionSelector;
