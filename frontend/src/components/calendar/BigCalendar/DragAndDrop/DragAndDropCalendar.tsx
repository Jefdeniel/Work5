import { useCallback, useState } from 'react';

import { CalendarEvent } from '../../../../@types/CalendarEvents';
import LoadingScreen from '../../../ui/Loading/LoadingScreen';
import BigCalendar from '../BigCalendar';

const DragAndDropCalendar = (events: CalendarEvent[]) => {
  // State to manage the calendar events
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(events);
  console.log(events);

  // Callback function to update event start and end times
  const onChangeEventTime = useCallback(
    (start: Date, end: Date, eventId: number) => {
      setCalendarEvents((prevEvents) =>
        prevEvents.map((event) =>
          // If the event id = eventId being updated, update start and end times
          event?.id === eventId ? { ...event, start, end } : event
        )
      );
    },
    []
  );

  // Handle setting a new event
  const handleShowEventView = useCallback((newEvent: CalendarEvent) => {
    setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <BigCalendar
      resizable
      // To make events draggable
      draggableAccessor={() => true}
      // Logic when changing an events place
      onEventDrop={({ start, end, event }) => {
        console.log('onEventDrop', start, end, event);
        // onChangeEventTime(start, end, event.id);
      }}
      // Logic when resizing an events
      onEventResize={({ start, end, event }) => {
        console.log('onEventResize', start, end, event);
        // onChangeEventTime(start, end, event.id);
      }}
      events={calendarEvents}
      // Callback function to update event start and end times
      onShowEventView={handleShowEventView}
    />
  );
};

export default DragAndDropCalendar;
