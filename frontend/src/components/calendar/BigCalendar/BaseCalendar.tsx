import moment from 'moment';
import { useMemo, useEffect, useContext } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { SettingsContext } from '../../../store/SettingsContext';
import { Event } from '../../../@types/Events';
import useFetchedEvents from '../../../hooks/UseFetchedEvents';
import EventCard from '../../ui/EventCard/EventCard';

import './BaseCalendar.scss';
import './Calendar.scss';

// Calendar step 1: General calendar settings/structure

const DnDCalendar = withDragAndDrop<Event>(Calendar);

interface CalendarProps {
  onShowEventView: (event: Event) => void;
}

const BaseCalendar = ({ onShowEventView }: CalendarProps) => {
  const { events } = useFetchedEvents();
  const localizer = momentLocalizer(moment);
  const { week_start_day, weekend_visibility, time_format } =
    useContext(SettingsContext);

  useEffect(() => {
    moment.updateLocale('es-es', {
      week: {
        dow: week_start_day === 'Monday' ? 1 : 0,
      },
      formats: {
        timeGutterFormat: time_format === '24h' ? 'HH:mm' : 'hh:mm A',
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'HH:mm', culture) +
          ' - ' +
          localizer.format(end, 'HH:mm', culture),
        agendaTimeFormat: time_format === '24h' ? 'HH:mm' : 'hh:mm A',
      },
    });
  }, [week_start_day, time_format]);

  const handleEditEvent = () => {};

  const components = useMemo(
    () => ({
      event: ({ event }: { event: Event }) => (
        <EventCard
          event={event}
          color={event.color}
          onDoubleClick={handleEditEvent}
        />
      ),
    }),
    []
  );

  const initProps = useMemo(
    () => ({
      views: weekend_visibility
        ? [Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]
        : [Views.DAY, Views.WORK_WEEK, Views.MONTH, Views.AGENDA],
      defaultView: weekend_visibility ? Views.WEEK : Views.WORK_WEEK,
      onSelectSlot: ({ start, end }) => {
        onShowEventView({ start, end });
        console.log('START: ', start, 'END: ', end);
      },
      onDoubleClickEvent: onShowEventView,
      events,
      style: { width: '100%', height: '100%' },
      components: components,
      selectable: true,
      format: time_format === '24H' ? 'HH:mm' : 'hh:mm A',
    }),
    [weekend_visibility, events, time_format, components, onShowEventView]
  );

  return (
    // <div
    //   className={`full-calendar ${weekend_visibility ? 'weekend-visible' : 'weekend-hidden'}`}
    // >
    <div className={'full-calendar '}>
      <DnDCalendar
        {...initProps}
        localizer={localizer}
        views={
          weekend_visibility
            ? [Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]
            : [Views.DAY, Views.WORK_WEEK, Views.MONTH, Views.AGENDA]
        }
        defaultView={weekend_visibility ? Views.WEEK : Views.WORK_WEEK}
        onSelectSlot={({ start, end }) => {
          // Logic when selecting a time slot
          onShowEventView({ start, end });
          console.log('START: ', start, 'END: ', end);
        }}
        onDoubleClickEvent={(event) => {
          const calendarEvent = event;
          calendarEvent && onShowEventView(event);
        }}
        events={events} // Events db
        style={{ width: '100%', height: '100%' }} // General props
        components={components}
        selectable
      />
    </div>
  );
};

export default BaseCalendar;
