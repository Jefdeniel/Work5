import { useCallback, useEffect, useState, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarUser } from '../../../@types/Calendar';
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import Input from '../../ui/Input/Input';
import CalendarCard from './CalendarCard';
import DeleteCalendarModal from '../BigCalendar/Modals/DeleteCalendarModal';
import { CalendarContext } from '../../../store/CalendarContext';

interface CalendarCardListProps {
  isMenuCollapsed?: boolean;
  layout?: 'row' | 'column';
}

const CalendarCardList = ({
  layout = 'row',
  isMenuCollapsed,
}: CalendarCardListProps) => {
  const { user_id } = useAuth();
  const { t } = useTranslation(['general']);
  const calendarContext = useContext(CalendarContext);

  // Placeholder images and data
  const USER_AVATARS = ['/icons/user-profile.svg', ''];
  const PLACEHOLDER_IMG =
    'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtNDY3YmF0Y2gyLWNhbGVuZGFyLTAwMS5wbmc.png';

  // State hooks
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCalendars, setFilteredCalendars] = useState<CalendarUser[]>(
    []
  );
  const [calendarToDelete, setCalendarToDelete] = useState<CalendarUser | null>(
    null
  );

  // Fetch data
  const { fetchData: fetchCalendars } = useFetch('GET', [
    'calendar_users',
    'user_id',
    user_id?.toString() ?? '',
  ]);

  const fetchCalendarsMemoized = useCallback(fetchCalendars, [fetchCalendars]);

  useEffect(() => {
    const fetchCalendarsData = async () => {
      try {
        const response = await fetchCalendarsMemoized();
        const data: CalendarUser[] = await response.json();
        calendarContext.setCalendars(data);
        setFilteredCalendars(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCalendarsData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Add Google calendar to data array
    const dataWithGoogle = [
      ...calendarContext.calendars,
      {
        calendar: {
          title: 'Google',
          img: '/img/google-calendar-logo.svg',
        },
        userAvatars: USER_AVATARS,
        user: 0,
        link: '/calendar/google',
        role: '',
      },
    ];

    const filteredData = dataWithGoogle.filter((calendarUser) => {
      const calendarTitle = calendarUser.calendar.title.toLowerCase();
      return calendarTitle.includes(searchValue);
    });

    setFilteredCalendars(filteredData);
  };

  const handleDelete = (calendar: CalendarUser) => {
    setCalendarToDelete(calendar);
  };

  const handleCloseDeleteModal = () => {
    setCalendarToDelete(null);
  };

  const handleRemoveCalendar = (deletedCalendarId: number) => {
    calendarContext.setCalendars((prevCalendars) =>
      prevCalendars.filter(
        (calendar) => calendar.calendar.id !== deletedCalendarId
      )
    );
    setFilteredCalendars((prevCalendars) =>
      prevCalendars.filter((calendar) => calendar.id !== deletedCalendarId)
    );
  };

  return (
    <ul
      className={`calendar-card-list d-flex ${layout === 'row' ? 'flex-row' : 'flex-column'}`}
    >
      {!isMenuCollapsed && (
        <Input
          value={searchTerm}
          onChange={handleSearch}
          isSearch
          type="search"
          placeholder={t('general:navigation.search')}
        />
      )}

      <CalendarCard
        img="/img/google-calendar-logo.svg"
        name="Google"
        userAvatars={USER_AVATARS}
        link="/calendar/google"
        onDelete={() =>
          handleDelete({
            calendar: {
              title: 'Google',
              image: '/img/google-calendar-logo.svg',
            },
            userAvatars: USER_AVATARS,
            user: 0,
            link: '/calendar/google',
            role: '',
          })
        }
        onEdit={() => {}}
      />

      {filteredCalendars.map((calendarUser) => (
        <CalendarCard
          key={calendarUser.id}
          img={calendarUser.calendar.image || PLACEHOLDER_IMG}
          name={!isMenuCollapsed ? calendarUser.calendar.title : ''}
          link={`/calendar/${calendarUser.calendar.id}`}
          onDelete={() => handleDelete(calendarUser)}
          onEdit={() => {}}
        />
      ))}

      {calendarToDelete && (
        <DeleteCalendarModal
          onClose={handleCloseDeleteModal}
          calendar={calendarToDelete.calendar}
          onRemoveCalendar={handleRemoveCalendar}
        />
      )}

      {/* {calendarToEdit && (
        <EditCalendarModal
          onClose={handleCloseEditModal}
          calendar={calendarToEdit.calendar}
          onEditCalendar={handleEditCalendar}
        />
      } */}
    </ul>
  );
};

export default CalendarCardList;
