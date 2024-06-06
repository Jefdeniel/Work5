import moment from 'moment';
import { useMemo, useEffect, useContext, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { SettingsContext } from '../../../store/SettingsContext';
import { Event } from '../../../@types/Events';
import useFetchedEvents from '../../../hooks/UseFetchedEvents';
import EventCard from '../../ui/EventCard/EventCard';
import CustomToolbar from './SmallComponents/CustomToolbar';
import EditEventModal from '../events/Modals/EditEventModal';

import './BaseCalendar.scss';
import './Calendar.scss';

// Calendar step 1: General calendar settings/structure
// TODO: Warning error on Agenda view
// TODO 2: Transform start and end time to luxon

const DnDCalendar = withDragAndDrop<Event>(Calendar);

interface CalendarProps {
  onShowEventView: (event: Event) => void;
}

type Keys = keyof typeof Views;

const BaseCalendar = ({ onShowEventView }: CalendarProps) => {
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [isSmallCalendarOpen, setIsSmallCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
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
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'HH:mm', culture) +
          ' - ' +
          localizer.format(end, 'HH:mm', culture),
        agendaTimeFormat: time_format === '24h' ? 'HH:mm' : 'hh:mm A',
      },
    });
  }, [week_start_day, time_format]);

  const handleOpenTimeBlockingModal = () => {
    setShowEditEventModal(true);
  };

  const closeAddTimeBlockingModal = () => {
    setShowEditEventModal(false);
  };

  const handleEditEvent = () => {
    console.log('Edit event');
    closeAddTimeBlockingModal();
  };

  const components = useMemo(
    () => ({
      event: ({ event }: { event: Event }) => (
        <EventCard
          event={event}
          color={event.color}
          onDoubleClick={handleEditEvent}
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
        onShowEventView({ start, end });
        console.log('START: ', start, 'END: ', end);
      },
      onDoubleClickEvent: onShowEventView,
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

  // Handle search input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredEvents = events.filter((event) =>
        event?.title?.toLowerCase().includes(query.toLowerCase())
      );
      // Set filtered events
      setFilteredEvents(filteredEvents);
    } else {
      // Reset filtered events
      setFilteredEvents([]);
    }
  };

  const handleEventClick = (event: Event) => {
    console.log('Event clicked: ', event);
    setSelectedEvent(event);
    handleOpenTimeBlockingModal();
  };

  return (
    // TODO: Add weekend visibility toggle
    <div className={'full-calendar'}>
      {/* <div className={`full-calendar ${weekend_visibility ? 'weekend-visible' : 'weekend-hidden'}`} > */}

      <CustomToolbar
        searchQuery={searchQuery}
        handleSearchInput={handleSearchInput}
        filteredEvents={filteredEvents}
        handleEventClick={handleEventClick}
        view={view}
        setView={setView}
        date={date}
        setDate={setDate}
        handleSearchFocus={handleSearchFocus}
        isSmallCalendarOpen={isSmallCalendarOpen}
        handleDateChange={handleDateChange}
      />

      {showEditEventModal && (
        <EditEventModal
          title={selectedEvent?.title!}
          description={selectedEvent?.description!}
          start_time={selectedEvent?.start as Date}
          end_time={selectedEvent?.end as Date}
          onClose={closeAddTimeBlockingModal}
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
        onSelectSlot={({ start, end }) => {
          // Logic when selecting a time slot
          onShowEventView({ start, end });
          console.log('START: ', start, 'END: ', end);
        }}
        onDoubleClickEvent={(event) => {
          const calendarEvent = event;
          calendarEvent && onShowEventView(event);
        }}
        events={events} // Events db
        style={{ width: '100%', height: '100%' }} // General props
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
