import { CalendarProps } from 'react-big-calendar';
import { useContext } from 'react';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import EventCard from '../../ui/EventCard/EventCard';
import BaseCalendar from './BaseCalendar';
import { SettingsContext } from '../../../store/SettingsContext';
import { CalendarEvent } from '../../../@types/CalendarEvents';

import './Calendar.scss';

const localizer = momentLocalizer(moment);

// Add drag and drop functionality to the calendar
// const DnDCalendar = withDragAndDrop(BaseCalendar);

// Add TypeScript types for the calendar props
type DnDType = CalendarProps & withDragAndDropProps;
type CustomCalendarProps = Omit<DnDType, 'components' | 'localizer'> & {
  onShowEventView?: (event: CalendarEvent) => void;
};
/*
const BigCalendar = (props: CustomCalendarProps) => {
  const { weekend_visibility } = useContext(SettingsContext);
  console.log(weekend_visibility);

  const { onShowEventView, ...restProps } = props;

  const components = {
    event: ({ event }) => {
      return <EventCard title={event.title} color={event.color} />;
    },
  };

  return (
    <div className="full-calendar">
      <DnDCalendar
        onSelectSlot={({ start, end }) => {
          console.log('onSelectSlot', start, end);
          onShowEventView({ start, end });
        }}
        localizer={localizer}
        components={components}
        selectable
        {...props}
      />
    </div>
  );
};

export default BigCalendar;
*/