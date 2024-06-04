import { useState } from 'react';

import { Event } from '../../../@types/Events';
import BaseCalendar from './BaseCalendar';
import EditEventModal from '../events/Modals/EditEventModal';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendar.scss';

// Calendar 2: View on base calendar
const CalendarView = () => {
  // Event is gonna be used to show the event view of the clicked event
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  useState<boolean>(false);
  const [newEventTimes, setNewEventTimes] = useState<
    { start: Date; end: Date } | undefined
  >();

  return (
    <div className="full-calendar">
      <BaseCalendar
        onShowEventView={(event) => {
          setSelectedEvent(event);
        }}
      />

      {selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          setEvent={setSelectedEvent}
          onClose={() => setSelectedEvent(undefined)}
        />
      )}
    </div>
  );
};

export default CalendarView;
