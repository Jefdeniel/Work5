import moment from 'moment';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  DateLocalizer,
  Views,
  momentLocalizer,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { Event } from '../../../@types/Events';
import useFetchedEvents from '../../../hooks/UseFetchedEvents';
import { SettingsContext } from '../../../store/SettingsContext';

import EventCard from '../../ui/EventCard/EventCard';
import AddEventModal from '../events/Modals/AddEventModal';
import EditEventModal from '../events/Modals/EditEventModal';
import CustomToolbar from './SmallComponents/CustomToolbar';

import './BaseCalendar.scss';
import './Calendar.scss';

type Keys = keyof typeof Views;
const DnDCalendar = withDragAndDrop<Event>(Calendar);
interface CalendarProps {
  onShowEventView: (event: Event) => void;
}

const BaseCalendar = ({ onShowEventView }: CalendarProps) => {
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [isSmallCalendarOpen, setIsSmallCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [newEventTimes, setNewEventTimes] = useState<{
    start: Date;
    end: Date;
  }>();

  const { events } = useFetchedEvents();
  const localizer = momentLocalizer(moment);
  const { week_start_day, weekend_visibility, time_format } =
    useContext(SettingsContext);

  const STEP = 15;
  const TIMESLOTS = 60 / STEP;

  useEffect(() => {
    moment.updateLocale('es-es', {
      week: {
        dow: week_start_day === 'Monday' ? 1 : 0,
      },
      formats: {
        timeGutterFormat: time_format === '24h' ? 'HH:mm' : 'hh:mm A',
        eventTimeRangeFormat: (
          { start, end },
          culture: string,
          localizer: DateLocalizer
        ) =>
          localizer.format(start, 'HH:mm', culture) +
          ' - ' +
          localizer.format(end, 'HH:mm', culture),
        agendaTimeFormat: time_format === '24h' ? 'HH:mm' : 'hh:mm A',
      },
    });
  }, [week_start_day, time_format]);

  const handleOpenEditEventModal = () => {
    setShowEditEventModal(true);
  };

  const handleOpenAddEventModal = () => {
    setShowAddEventModal(true);
  };

  const closeEditEventModal = () => {
    setShowEditEventModal(false);
  };

  const closeAddEventModal = () => {
    setShowAddEventModal(false);
  };

  const components = useMemo(
    () => ({
      event: ({ event }: { event: Event }) => (
        <EventCard
          event={event}
          color={event.color}
          onDoubleClick={handleOpenEditEventModal}
        />
      ),
    }),
    []
  );

  const initProps = useMemo(
    () => ({
      views: weekend_visibility
        ? [Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]
        : [Views.DAY, Views.WORK_WEEK, Views.MONTH, Views.AGENDA],
      defaultView: weekend_visibility ? Views.WEEK : Views.WORK_WEEK,
      onSelectSlot: ({ start, end }) => {
        setNewEventTimes({ start, end });
        setSelectedEvent(undefined);
        handleOpenAddEventModal();
      },
      onDoubleClickEvent: (event) => {
        console.log('Event double clicked: ', event);
        setSelectedEvent(event);
        setNewEventTimes(undefined);
        handleOpenEditEventModal();
      },
      events,
      style: { width: '100%', height: '100%' },
      components: components,
      selectable: true,
      format: time_format === '24H' ? 'HH:mm' : 'hh:mm A',
    }),
    [weekend_visibility, events, time_format, components, onShowEventView]
  );

  const handleSearchFocus = () => {
    setIsSmallCalendarOpen(true);
  };

  const handleDateChange = (newDate: Date) => {
    if (newDate instanceof Date) {
      setDate(newDate);
      setIsSmallCalendarOpen(false);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredEvents = events.filter((event) =>
        event?.title?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filteredEvents);
    } else {
      setFilteredEvents([]);
    }
  };

  const handleEventClickForSearch = (event: Event) => {
    console.log('Event clicked: ', event);
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewEventTimes({ start, end });
    handleOpenAddEventModal();
  };

  const handleDoubleClickEvent = (event: Event) => {
    setSelectedEvent(event);
    handleOpenEditEventModal();
  };

  return (
    <div className={'full-calendar'}>
      <CustomToolbar
        searchQuery={searchQuery}
        handleSearchInput={handleSearchInput}
        filteredEvents={filteredEvents}
        handleEventClick={handleEventClickForSearch}
        view={view}
        setView={setView}
        date={date}
        setDate={setDate}
        handleSearchFocus={handleSearchFocus}
        isSmallCalendarOpen={isSmallCalendarOpen}
        handleDateChange={handleDateChange}
      />
      {showEditEventModal && selectedEvent && (
        <EditEventModal event={selectedEvent} onClose={closeEditEventModal} />
      )}
      {showAddEventModal && newEventTimes && (
        <AddEventModal
          start={newEventTimes.start.toISOString()}
          end={newEventTimes.end.toISOString()}
          onClose={closeAddEventModal}
        />
      )}
      <DnDCalendar
        {...initProps}
        localizer={localizer}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        defaultView={weekend_visibility ? Views.WEEK : Views.WORK_WEEK}
        onSelectSlot={handleSelectSlot}
        onDoubleClickEvent={handleDoubleClickEvent}
        events={events}
        style={{ width: '100%', height: '100%' }}
        components={components}
        selectable
        toolbar={false}
        step={STEP}
        timeslots={TIMESLOTS}
      />
    </div>
  );
};

export default BaseCalendar;
