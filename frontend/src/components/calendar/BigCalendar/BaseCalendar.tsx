import moment from 'moment';
import { useMemo, useEffect, useContext } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { SettingsContext } from '../../../store/SettingsContext';
import { CalendarEvent } from '../../../@types/CalendarEvents';
import useFetchedEvents from '../../../hooks/UseFetchedEvents';
import EventCard from '../../ui/EventCard/EventCard';

import './BaseCalendar.scss';
import './Calendar.scss';

// TODO: Luxon integration
// Calendar 1: General calendar settings/structure
const localizer = momentLocalizer(moment);

let formats = {
  timeGutterFormat: 'HH:mm',
};

const initProps = {
  // Localizer is used to format dates / date localization
  localizer: localizer,
  // Amount of timeslots in an hour
  timeslots: 4,
  // Amount of minutes in a step
  step: 15,
  formats: { formats },
};

// Enhance the calendar with drag and drop functionality
const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar);

interface CalendarProps {
  onShowEventView: (event: CalendarEvent) => void;
}

// Base of the calendar component
const BaseCalendar = ({ onShowEventView }: CalendarProps) => {
  const { week_start_day, weekend_visibility } = useContext(SettingsContext);

  // Setting: week start day
  useEffect(() => {
    moment.updateLocale('es-es', {
      week: {
        dow: week_start_day === 'Monday' ? 1 : 0,
      },
    });
  }, [week_start_day]);

  const { events /*loading,*/ } = useFetchedEvents();

  const components = useMemo(
    () => ({
      event: ({ event }: { event: any }) => {
        return (
          <EventCard
            title={event.title}
            color={event.color}
            onDoubleClick={() => {}}
          />
        );
      },
    }),
    []
  );

  return (
    // <div
    //   className={`full-calendar ${weekend_visibility ? 'weekend-visible' : 'weekend-hidden'}`}
    // >
    <div className={'full-calendar '}>
      <DnDCalendar
        {...initProps}
        views={
          // Views that are available to user
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
