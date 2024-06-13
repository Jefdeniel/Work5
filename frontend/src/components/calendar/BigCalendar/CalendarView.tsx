import { useState } from 'react';

import { Event } from '../../../@types/Events';

import EditEventModal from '../events/Modals/EditEventModal';
import BaseCalendar from './BaseCalendar';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendar.scss';

// Calendar 2: View on base calendar
const CalendarView = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();

  const handleShowEventView = (event: Event | { start: Date; end: Date }) => {
    if ('title' in event) {
      setSelectedEvent(event as Event);
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
    </div>
  );
};

export default CalendarView;
