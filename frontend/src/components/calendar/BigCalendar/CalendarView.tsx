import { useState } from 'react';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { Event } from '../../../@types/Events';
import BaseCalendar from './BaseCalendar';

import './Calendar.scss';
import EditEventModal from '../events/Modals/EditEventModal';

// Calendar 2: View on base calendar
const BigCalendar = () => {
  // Event is gonna be used to show the event view of the clicked event
  const [event, setEvent] = useState<Event>();

  return (
    <div className="full-calendar">
      <BaseCalendar
        onShowEventView={(event) => {
          setEvent(event);
        }}
      />

      {event && (
        <EditEventModal
          showEvent={true}
          event={event}
          titleValue=""
          descriptionValue=""
          onClose={() => setEvent(undefined)}
        />
      )}
    </div>
  );
};

export default BigCalendar;
