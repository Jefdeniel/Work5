import { FieldMetaState } from 'react-final-form';

import Input from '../../../ui/Input/Input';

interface Props {
  changeStart?: boolean;
  initialValue?: string;
  value?: string;
  meta?: FieldMetaState<any>;
  onChange?: (start: string) => void;
  [key: string]: any;
}

const EventTimeSelector = ({
  changeStart,
  initialValue,
  value,
  meta,
  onChange,
  ...rest
}: Props) => {
  const onEventStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedStart = e.target.value;

    if (selectedStart) {
      onChange && onChange(selectedStart);
    }
  };

  return (
    <Input
      type="time"
      defaultValue={initialValue}
      value={value}
      onChange={onEventStartChange}
      meta={meta}
      {...rest}
    />
  );
};

export default EventTimeSelector;
