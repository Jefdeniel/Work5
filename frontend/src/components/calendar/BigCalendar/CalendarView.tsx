import { useState } from 'react';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { Event } from '../../../@types/Events';
import BaseCalendar from './BaseCalendar';
import AddEventModal from '../events/Modals/AddEventModal';

import './Calendar.scss';

// Calendar 2: View on base calendar
const CalendarView = () => {
  // Event is gonna be used to show the event view of the clicked event
  const [event, setEvent] = useState<Event>();

  // Add event to the list
  // const addEventToList = (event: Event) => {
  //   setEvent(event);
  // };

  return (
    <div className="full-calendar">
      <BaseCalendar
        onShowEventView={(event) => {
          setEvent(event);
        }}
      />

      {event && (
        <AddEventModal
          // setEvent={addEventToList}
          onClose={() => setEvent(undefined)}
        />
      )}
    </div>
  );
};

export default CalendarView;
