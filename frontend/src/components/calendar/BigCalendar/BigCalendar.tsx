import { CalendarProps } from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import EventCard from '../../ui/EventCard/EventCard';
// import { CalendarEvent } from '../../../@types/Events';
import BaseCalendar from './BaseCalendar';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import './Calendar.scss';

const localizer = momentLocalizer(moment);

// Add drag and drop functionality to the calendar
const DnDCalendar = withDragAndDrop(BaseCalendar);
// Add TypeScript types for the calendar props
type DnDType = CalendarProps & withDragAndDropProps;
type CustomCalendarProps = Omit<DnDType, 'components' | 'localizer'>;

const BigCalendar = (props: CustomCalendarProps) => {
  const components = {
    event: ({ event }) => {
      return <EventCard title={event.title} color={event.color} />;
    },
  };

  return (
    <div className="full-calendar">
      <DnDCalendar localizer={localizer} components={components} {...props} />
    </div>
  );
};

export default BigCalendar;
