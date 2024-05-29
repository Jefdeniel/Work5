import { useState } from 'react';
import Calendar from 'react-calendar';

import './smallcalendar.scss';

type DateRange = [Date | null, Date | null];

interface Props {
  className?: string;
  onChange?: (date: Date | DateRange) => void;
}

const SmallCalendar = ({ className, onChange }: Props) => {
  const [value, setValue] = useState<Date | DateRange>(new Date());

  const handleChange = (date: Date | DateRange) => {
    setValue(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <Calendar
      className={`${className} full-small-calendar p-1`}
      onChange={handleChange}
      value={value}
    />
  );
};

export default SmallCalendar;
