import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import Input from '../../../ui/Input/Input';

interface Props {
  changeStart?: boolean;
  initialValue?: string;
  value?: Date;
  meta?: FieldMetaState<any>;
  onChange?: (start: string) => void;
  [key: string]: any;
}
const StartEventTimeSelector = ({ value, meta, onChange, ...rest }) => {
  const { t } = useTranslation(['events']);

  const formatDateTimeLocal = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  const onEventStartChange = (e) => {
    const selectedStart = e.target.value;
    if (selectedStart) {
      onChange && onChange(new Date(selectedStart).toISOString());
    }
  };

  return (
    <Input
      type="datetime-local"
      title={t('events:eventInfo.start')}
      value={formatDateTimeLocal(value)}
      onChange={onEventStartChange}
      meta={meta}
      {...rest}
    />
  );
};

export default StartEventTimeSelector;
