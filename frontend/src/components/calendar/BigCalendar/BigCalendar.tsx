import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import './Calendar.scss';

const BigCalendar = (props: Omit<CalendarProps, 'localizer'>) => {
  const localizer = momentLocalizer(moment);

  const events = [
    {
      start: moment('2024-05-15T10:00:00').toDate(),
      end: moment('2024-05-15T11:00:00').toDate(),
      title: 'Meeting with John',
    },
    {
      start: moment('2024-05-21T14:00:00').toDate(),
      end: moment('2024-05-21T19:30:00').toDate(),
      title: 'Something else',
    },
  ];

  const components = {
    event: (props) => {
      return null;
    },
  };

  return (
    <div className={`full-calendar`}>
      <Calendar
        {...props}
        localizer={localizer}
        events={events}
        components={components}
        formats={{
          dayHeaderFormat: (date) => moment(date).format('MMMM DD yy'),
        }}
      />
    </div>
  );
};

export default BigCalendar;
