import { useState } from 'react';
import Calendar from 'react-calendar';

import './smallcalendar.scss';

type DateRange = [Date | null, Date | null];

interface Props {
  className?: string;
}

const SmallCalendar = ({ className }: Props) => {
  const [value, onChange] = useState<Date | DateRange>(new Date()); // i dont get this?

  const handleChange = (date: Date | DateRange) => {
    // TODO: Show day data on the right when clicking on a day
    // onChange(date);
    console.log(date);
  };

  return (
    <Calendar className={className} onChange={handleChange} value={value} />
  );
};

export default SmallCalendar;
