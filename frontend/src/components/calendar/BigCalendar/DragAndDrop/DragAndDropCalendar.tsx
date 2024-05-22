import { useCallback, useState } from 'react';

import { useFetchEvents } from '../../../../hooks/UseFetchedEvents';
import BigCalendar from '../BigCalendar';
import LoadingScreen from '../../../ui/Loading/LoadingScreen';

const DragAndDropCalendar = () => {
  // Custom hook to fetch events, along with loading and error state
  const { events, loading, error } = useFetchEvents();
  // State to manage the calendar events
  const [calendarEvents, setCalendarEvents] = useState(events);

  // Callback function to update event start and end times
  const onChangeEventTime = useCallback(
    (start: Date, end: Date, eventId: number) => {
      setCalendarEvents((prevEvents) =>
        prevEvents.map((event) =>
          // If the event id matches the event id being updated, update the start and end times
          event?.id === eventId ? { ...event, start, end } : event
        )
      );
    },
    []
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <BigCalendar
      resizable
      draggableAccessor={() => true}
      // Logic when changing an events place
      onEventDrop={({ start, end, event }) => {
        console.log('onEventDrop', start, end, event);
        onChangeEventTime(start, end, event?.id);
      }}
      // Logic when resizing an events
      onEventResize={({ start, end, event }) => {
        console.log('onEventResize', start, end, event);
      }}
      events={calendarEvents}
    />
  );
};

export default DragAndDropCalendar;
