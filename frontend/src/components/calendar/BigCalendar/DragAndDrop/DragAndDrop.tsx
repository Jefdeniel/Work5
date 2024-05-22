import { useState } from 'react';
import BigCalendar from '../BigCalendar';

const DragAndDropCalendar = () => {
  const [events, setEvents] = useState([]);

  return (
    <BigCalendar
      resizable
      draggableAccessor={() => true}
      // Logic when changing an events place
      onEventDrop={(props) => {
        console.log('onEventDrop', props);
      }}
      // Logic when resizing an events
      onEventResize={(props) => {
        console.log('onEventResize', props);
      }}
    />
  );
};

export default DragAndDropCalendar;
