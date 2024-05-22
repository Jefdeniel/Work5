import { useEffect, useState } from 'react';
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import { toast } from 'react-toastify';
import moment from 'moment';
import { DateTime } from 'ts-luxon';

import useFetch from '../../../hooks/useFetch';
import LoadingScreen from '../../ui/Loading/LoadingScreen';
import EventCard from '../../ui/EventCard/EventCard';

import './Calendar.scss';

const BigCalendar = (props: Omit<CalendarProps, 'localizer'>) => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const { fetchData: getEvents } = useFetch('GET', ['events']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEvents()
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch events');
        }
      })
      .then((data) => {
        // Transform the events
        const formattedEvents = data.map((event) => ({
          ...event,
          start: DateTime.fromISO(event.start_time).toJSDate(),
          end: DateTime.fromISO(event.end_time).toJSDate(),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setError(error.message);
        toast.error('Error fetching events');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  const components = {
    event: ({ event }) => {
      return <EventCard title={event.title} color={event.color} />;
    },
  };

  return (
    <div className="full-calendar">
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
