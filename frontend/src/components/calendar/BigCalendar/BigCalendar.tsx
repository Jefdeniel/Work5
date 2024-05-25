import { useEffect, useState, useMemo } from 'react';
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import { toast } from 'react-toastify';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import EventCard from '../../ui/EventCard/EventCard';
import BaseCalendar from './BaseCalendar';
import { SettingsContext } from '../../../store/SettingsContext';
import { CalendarEvent } from '../../../@types/CalendarEvents';

import './Calendar.scss';

const localizer = momentLocalizer(moment);

// for drag and drop
const DnDCalendar = withDragAndDrop<CalendarEvent, {}>(Calendar);
type DnDType = CalendarProps<CalendarEvent, {}> &
  withDragAndDropProps<CalendarEvent>;
type CustomCalendarProps = Omit<DnDType, 'components' | 'localizer'> & {
  onShowEventView?: (event: CalendarEvent) => void;
};

const BigCalendar = (props: CustomCalendarProps) => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
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
        // Transform the events to have start and end as Date objects
        const formattedEvents = data.map((event: any) => ({
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

  const components = useMemo(
    () => ({
      event: ({ event }: { event: CalendarEvent }) => {
        return <EventCard title={event.title} color={event.color} />;
      },
      // We can also add other components here
    }),
    []
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="full-calendar">
      <DnDCalendar
        onSelectSlot={({ start, end }) => {
          console.log('onSelectSlot', start, end);
          onShowEventView({ start, end });
        }}
        localizer={localizer}
        components={components}
        selectable
        {...props}
      />
    </div>
  );
};

export default BigCalendar;
