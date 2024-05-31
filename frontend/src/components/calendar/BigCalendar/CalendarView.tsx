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
  const [isAddEventModalOpen, setIsAddEventModalOpen] =
    useState<boolean>(false);
  const [newEventTimes, setNewEventTimes] = useState<
    { start: Date; end: Date } | undefined
  >();

  // Function to handle opening the AddEventModal
  const handleAddEvent = ({ start, end }: { start: Date; end: Date }) => {
    setNewEventTimes({ start, end });
    setIsAddEventModalOpen(true);
  };

  // Function to handle closing modals
  const handleCloseModal = () => {
    setSelectedEvent(undefined);
    setIsAddEventModalOpen(false);
  };

  // // Add event to the list
  // const addEventToList = (event: Event) => {
  //   setEvent(event);
  // };

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
