import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import EventCard from '../../../ui/EventCard/EventCard';

const localizer = momentLocalizer(moment);

const components = {
  event: ({ event }) => {
    return <EventCard title={event.title} color={event.color} />;
  },
};

export const props = {
  localizer,
  components,
  formats: {
    dayHeaderFormat: (date: Date) => moment(date).format('MMMM DD yy'),
  },
};
