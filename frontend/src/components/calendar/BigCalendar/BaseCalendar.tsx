import moment from 'moment';
import { useMemo, useEffect, useContext, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { VIEW_OPTIONS } from '../../../constants/calendar';
import { SettingsContext } from '../../../store/SettingsContext';
import { Event } from '../../../@types/Events';
import useFetchedEvents from '../../../hooks/UseFetchedEvents';
import EventCard from '../../ui/EventCard/EventCard';
import Button from '../../ui/Button/Button';
import ProfilePicture from '../../ui/ProfilePicture/ProfilePicture';
import Icon from '../../ui/Icon/Icon';
import IconButton from '../../ui/IconButton/IconButton';
import Input from '../../ui/Input/Input';
import SmallCalendar from '../../ui/SmallCalendar/SmallCalendar';
import ToolbarViewList from './ToolbarViewList';

import './BaseCalendar.scss';
import './Calendar.scss';

// Calendar step 1: General calendar settings/structure
// TODO: Warning error on Agenda view

const DnDCalendar = withDragAndDrop<Event>(Calendar);

interface CalendarProps {
  onShowEventView: (event: Event) => void;
}

type Keys = keyof typeof Views;

const BaseCalendar = ({ onShowEventView }: CalendarProps) => {
  const { t } = useTranslation(['calendar']);
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [isSmallCalendarOpen, setIsSmallCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const { events } = useFetchedEvents();
  const localizer = momentLocalizer(moment);
  const { week_start_day, weekend_visibility, time_format } =
    useContext(SettingsContext);

  const STEP = 15;
  const TIMESLOTS = 60 / STEP;

  // TODO: Add users from the db? maybe put this in a seperate file
  const calendarUsers = [
    { id: 1, name: 'Person 1', avatar: '/img/test-img.jpg' },
    { id: 2, name: 'Person 2', avatar: '' },
    { id: 3, name: 'Person 3', avatar: '/img/test-img.jpg' },
    { id: 4, name: 'Person 4', avatar: '/img/test-img.jpg' },
  ];

  const onTodayClick = () => setDate(new Date());

  const onNextClick = () => {
    if (view === Views.DAY) setDate(moment(date).add(1, 'd').toDate());
    if (view === Views.WEEK) setDate(moment(date).add(1, 'w').toDate());
    if (view === Views.MONTH) setDate(moment(date).add(1, 'M').toDate());
  };

  const onPreviousClick = () => {
    if (view === Views.DAY) setDate(moment(date).subtract(1, 'd').toDate());
    if (view === Views.WEEK) setDate(moment(date).subtract(1, 'w').toDate());
    if (view === Views.MONTH) setDate(moment(date).subtract(1, 'M').toDate());
  };

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date).format('MMMM DD YYYY');
    if (view === Views.WEEK) {
      const start = moment(date).startOf('week');
      const end = moment(date).endOf('week');
      return `${start.format('DD/MM/YY')} - ${end.format('DD/MM/YY')}`;
    }
    if (view === Views.MONTH) return moment(date).format('MMMM YYYY');
  }, [date, view]);

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

  const handleEditEvent = () => {};

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
        event.title.toLowerCase().includes(query.toLowerCase())
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
    // TODO: TypeError: Cannot read properties of null (reading 'toString')
    // open EditEventModal with event data
  };

  return (
    // TODO: Add weekend visibility toggle
    <div className={'full-calendar'}>
      {/* <div className={`full-calendar ${weekend_visibility ? 'weekend-visible' : 'weekend-hidden'}`} > */}

      <div className="custom-toolbar">
        <Row className={`my-4 d-flex align-items-center search-row`}>
          <Col className={`full-search-block`}>
            {/* TODO: Add translation */}
            <Input
              className="toolbar__search"
              isSearch
              placeholder={t('calendar:calendar.search')}
              type="search"
              defaultValue={searchQuery}
              onChange={handleSearchInput}
            />

            {filteredEvents.length > 0 && (
              <ul className="search-results">
                {filteredEvents.map((event) => (
                  <li
                    key={event.id}
                    className="search-result-item"
                    onClick={() => handleEventClick(event)}
                  >
                    {event.title}
                  </li>
                ))}
              </ul>
            )}
          </Col>

          <Col className={`toolbar-top d-flex justify-content-end`}>
            <ToolbarViewList
              view={view}
              setView={setView}
              viewOptions={VIEW_OPTIONS}
            />
          </Col>
        </Row>

        <Row className={`my-3 d-flex align-items-center`}>
          <Col xs={9} className={`d-flex align-items-center date-title`}>
            <Button
              className={`btn--bordered-primary`}
              text="Today"
              onClick={onTodayClick}
            />

            <IconButton
              className={`click-btn`}
              icon={<img src="/icons/arrow.svg" alt="Arrow icon" />}
              onClick={onPreviousClick}
            />

            <span
              className={`heading heading--lg fw-bold text-center date-title position-relative`}
              onClick={handleSearchFocus}
            >
              {dateText}
            </span>

            {isSmallCalendarOpen && (
              <SmallCalendar
                className={`small-calendar position-absolute`}
                onChange={handleDateChange}
                nextLabel={<Icon src="/icons/arrow.svg" alt="Arrow icon" />}
                prevLabel={<Icon src="/icons/arrow.svg" alt="Arrow icon" />}
                next2Label={
                  <Icon src="/icons/double-arrow.svg" alt="Arrow icon" />
                }
                prev2Label={
                  <Icon src="/icons/double-arrow.svg" alt="Arrow icon" />
                }
              />
            )}

            <IconButton
              className={`click-btn`}
              icon={
                <img
                  className={`rotate-180`}
                  src="/icons/arrow.svg"
                  alt="Arrow icon"
                />
              }
              onClick={onNextClick}
            />
          </Col>

          <Col xs={3} className={`p-0 d-flex justify-content-end`}>
            <ul className={`d-flex gap-2`}>
              {calendarUsers.map((user) => (
                <li key={user.id}>
                  {user.avatar ? (
                    <ProfilePicture
                      isSmall
                      src={user.avatar}
                      alt={`Avatar of ${user.name}`}
                    />
                  ) : (
                    <Icon
                      src="/icons/user-profile.svg"
                      alt="User profile icon"
                    />
                  )}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>

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
