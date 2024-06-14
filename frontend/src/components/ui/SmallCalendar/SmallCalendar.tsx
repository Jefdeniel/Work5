import { useState } from 'react';
import Calendar from 'react-calendar';

import './smallcalendar.scss';

type DateRange = [Date | null, Date | null];

interface Props {
  className?: string;
  noNavigation?: boolean;
  onChange?: (date: Date | DateRange) => void;
  [key: string]: any;
}

const SmallCalendar = ({
  className,
  noNavigation,
  onChange,
  ...rest
}: Props) => {
  const [value, setValue] = useState<Date | DateRange>(new Date());

  const handleChange = (date: Date | DateRange) => {
    setValue(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <Calendar
      {...rest}
      className={`${className} full-small-calendar p-1 ${noNavigation ? 'no-calendar-navigation' : ''}`}
      onChange={handleChange}
      value={value}
    />
  );
};

export default SmallCalendar;
