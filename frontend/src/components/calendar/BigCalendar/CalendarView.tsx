import { useState } from 'react';

import { Event } from '../../../@types/Events';
import BaseCalendar from './BaseCalendar';
import EditEventModal from '../events/Modals/EditEventModal';
import AddEventModal from '../events/Modals/AddEventModal';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendar.scss';

// Calendar 2: View on base calendar
const CalendarView = () => {
  // Event is gonna be used to show the event view of the clicked event
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [newEventTimes, setNewEventTimes] = useState<
    { start: Date; end: Date } | undefined
  >();

  const handleShowEventView = (event: Event | { start: Date; end: Date }) => {
    if ('title' in event) {
      setSelectedEvent(event as Event);
    } else {
      setNewEventTimes(event as { start: Date; end: Date });
    }
  };

  return (
    <div className="full-calendar">
      <BaseCalendar onShowEventView={handleShowEventView} />

      {selectedEvent &&
        (console.log('Selected event:', selectedEvent),
        (
          <EditEventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(undefined)}
          />
        ))}

      {newEventTimes &&
        (console.log('New event:', newEventTimes),
        (
          <AddEventModal
            // start={newEventTimes.start}
            // end={newEventTimes.end}
            onClose={() => setNewEventTimes(undefined)}
          />
        ))}
    </div>
  );
};

export default CalendarView;
