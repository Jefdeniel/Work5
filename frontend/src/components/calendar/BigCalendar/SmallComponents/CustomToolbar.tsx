import { useMemo } from 'react';
import { Views } from 'react-big-calendar';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { Event } from '../../../../@types/Events';

import { translateViewOptions } from '../../../../constants/calendar';
import { useSettings } from '../../../../hooks/useSettings';
import SmallCalendar from '../../../ui/SmallCalendar/SmallCalendar';
import IconButton from '../../../ui/IconButton/IconButton';
import Icon from '../../../ui/Icon/Icon';
import ProfilePicture from '../../../ui/ProfilePicture/ProfilePicture';
import ToolbarViewList from './ToolbarViewList';
import Button from '../../../ui/Button/Button';
import SearchBar from './SearchBar';

import './CustomToolbar.scss';

interface Props {
  searchQuery: string;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredEvents: Event[];
  handleEventClick: (event: Event) => void;
  view: (typeof Views)[keyof typeof Views];
  setView: (view: (typeof Views)[keyof typeof Views]) => void;
  date: Date;
  setDate: (date: Date) => void;
  handleSearchFocus: () => void;
  isSmallCalendarOpen: boolean;
  handleDateChange: (date: Date) => void;
}

const CustomToolbar = ({
  searchQuery,
  handleSearchInput,
  filteredEvents,
  handleEventClick,
  view,
  setView,
  date,
  setDate,
  isSmallCalendarOpen,
  handleSearchFocus,
  handleDateChange,
}: Props) => {
  const { t } = useTranslation(['calendar']);
  const translatedViewOptions = translateViewOptions(t);
  const { theme } = useSettings();

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
      return `${start.format('DD/MM')} - ${end.format('DD/MM')}`;
    }
    if (view === Views.MONTH) return moment(date).format('MMMM YYYY');
  }, [date, view]);

  return (
    <div className="custom-toolbar">
      <Row className={`my-4 d-flex align-items-center search-row`}>
        <SearchBar
          searchQuery={searchQuery}
          handleSearchInput={handleSearchInput}
          filteredEvents={filteredEvents}
          handleEventClick={handleEventClick}
          className={`full-search-block`}
        />

        <Col className={`toolbar-top d-flex justify-content-end`}>
          <ToolbarViewList
            view={view}
            setView={setView}
            viewOptions={translatedViewOptions}
          />
        </Col>
      </Row>

      <Row className={`my-3 d-flex align-items-center`}>
        <Col xs={9} className={`d-flex align-items-center date-title`}>
          <Button
            className={`btn--bordered-primary`}
            text={t('calendar:calendar.today')}
            onClick={onTodayClick}
          />

          <IconButton
            className={`click-btn`}
            icon={
              theme === 'dark' ? (
                <img
                  className="arrow-bright"
                  src="/icons/arrow-bright.svg"
                  alt="Arrow icon"
                />
              ) : (
                <img src="/icons/arrow.svg" alt="Arrow icon" />
              )
            }
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
              theme === 'dark' ? (
                <img
                  className="arrow-bright--last rotate-180"
                  src="/icons/arrow-bright.svg"
                  alt="Arrow icon"
                />
              ) : (
                <img
                  className="rotate-180"
                  src="/icons/arrow.svg"
                  alt="Arrow icon"
                />
              )
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
                  <Icon src="/icons/user-profile.svg" alt="User profile icon" />
                )}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default CustomToolbar;
