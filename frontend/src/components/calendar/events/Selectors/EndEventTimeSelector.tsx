import { FieldMetaState } from 'react-final-form';
import Input from '../../../ui/Input/Input';
import { useTranslation } from 'react-i18next';

interface Props {
  changeStart?: boolean;
  initialValue?: string;
  value?: Date;
  meta?: FieldMetaState<any>;
  onChange?: (start: string) => void;
  [key: string]: any;
}

const EndEventTimeSelector = ({ value, meta, onChange, ...rest }) => {
  const { t } = useTranslation(['events']);

  const formatDateTimeLocal = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  const onEventStartChange = (e) => {
    const selectedEnd = e.target.value;
    if (selectedEnd) {
      onChange && onChange(new Date(selectedEnd).toISOString());
    }
  };

  return (
    <Input
      type="datetime-local"
      title={t('events:eventInfo.end')}
      value={formatDateTimeLocal(value)}
      onChange={onEventStartChange}
      meta={meta}
      {...rest}
    />
  );
};

export default EndEventTimeSelector;
