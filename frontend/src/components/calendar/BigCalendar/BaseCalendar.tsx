import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useMemo } from 'react';

import { CalendarEvent } from '../../../@types/CalendarEvents';

import EventCard from '../../ui/EventCard/EventCard';

import './Calendar.scss';
import useFetchedEvents from '../../../hooks/UseFetchedEvents';

//TODO: Luxon integration
// Calendar 1: General calendar settings/structure
const localizer = momentLocalizer(moment);

const initProps = {
  // Localizer is used to format dates / date localization
  localizer: localizer,
  // Views that are available to user
  views: [Views.DAY, Views.WEEK, Views.MONTH],
  // Default view when comming on page
  defaultView: Views.WEEK,
  // Amount of timeslots in an hour
  timeslots: 4,
  // Amount of minutes in a step
  step: 15,
};

// Enhance the calendar with drag and drop functionality
const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar);
interface CalendarProps {
  onShowEventView: (event: CalendarEvent) => void;
}

// Base of the calendar component
const BaseCalendar = ({ onShowEventView }: CalendarProps) => {
  // Fetch events + handle loading
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
    <div className="full-calendar">
      <DnDCalendar
        {...initProps}
        // Logic when selecting a time slot
        onSelectSlot={({ start, end }) => {
          onShowEventView({ start, end });
          console.log('START: ', start, 'END: ', end);
        }}
        onDoubleClickEvent={(event) => {
          const calendarEvent = event;
          calendarEvent && onShowEventView(event);
        }}
        // Events from the db
        events={events}
        style={{ width: '100%', height: '100%' }}
        // General props
        components={components}
        selectable
      />
    </div>
  );
};

export default BaseCalendar;
