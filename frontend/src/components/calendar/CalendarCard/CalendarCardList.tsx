import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CalendarUser } from '../../../@types/Calendar';

import { CalendarContext } from '../../../store/CalendarContext';
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import { CalendarContext } from '../../../store/CalendarContext';
import Input from '../../ui/Input/Input';
import DeleteCalendarModal from '../BigCalendar/Modals/DeleteCalendarModal';
import EditCalendarModal from '../BigCalendar/Modals/EditCalendarModal';
import CalendarCard from './CalendarCard';

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

  const USER_AVATARS = ['/icons/user-profile.svg', ''];
  const PLACEHOLDER_IMG =
    'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtNDY3YmF0Y2gyLWNhbGVuZGFyLTAwMS5wbmc.png';

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCalendars, setFilteredCalendars] = useState<CalendarUser[]>(
    []
  );
  const [calendarToDelete, setCalendarToDelete] = useState<CalendarUser | null>(
    null
  );

  const [calendarToEdit, setCalendarToEdit] = useState<CalendarUser | null>(
    null
  );

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
        if (!response.ok) {
          throw new Error('Failed to fetch calendars');
        }
        const data: CalendarUser[] = await response.json();

        const googleCalendar = {
          id: -1,
          calendar: {
            id: -1,
            title: 'Google',
            image: '/img/google-calendar-logo.svg',
          },
          user: 0,
          role: '',
        };

        const updatedData = [googleCalendar, ...data];

        calendarContext.setCalendars(updatedData);
        setFilteredCalendars(updatedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCalendarsData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filteredData = calendarContext.calendars.filter((calendarUser) => {
      const calendarTitle = calendarUser.calendar.title.toLowerCase();
      return calendarTitle.includes(searchValue);
    });

    setFilteredCalendars(filteredData);
  };

  // Modals
  const handleDelete = (calendar: CalendarUser) => {
    setCalendarToDelete(calendar);
  };

  const handleCloseDeleteModal = () => {
    setCalendarToDelete(null);
  };

  const handleEdit = (calendar: CalendarUser) => {
    setCalendarToEdit(calendar);
  };

  const handleCloseEditModal = () => {
    setCalendarToEdit(null);
  };

  const handleRemoveCalendar = (deletedCalendarId: number) => {
    calendarContext.setCalendars((prevCalendars) =>
      prevCalendars.filter(
        (calendarUser) => calendarUser.calendar.id !== deletedCalendarId
      )
    );
    setFilteredCalendars((prevCalendars) =>
      prevCalendars.filter(
        (calendarUser) => calendarUser.calendar.id !== deletedCalendarId
      )
    );
  };

  const handleEditCalendar = (editedCalendarId: number) => {
    calendarContext.setCalendars((prevCalendars) =>
      prevCalendars.map((calendarUser) =>
        calendarUser.calendar.id === editedCalendarId
          ? {
              ...calendarUser,
              calendar: {
                ...calendarUser.calendar,
                ...calendarToEdit?.calendar,
              },
            }
          : calendarUser
      )
    );
    setFilteredCalendars((prevCalendars) =>
      prevCalendars.map((calendarUser) =>
        calendarUser.calendar.id === editedCalendarId
          ? {
              ...calendarUser,
              calendar: {
                ...calendarUser.calendar,
                ...calendarToEdit?.calendar,
              },
            }
          : calendarUser
      )
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

      {filteredCalendars.map((calendarUser) => (
        <CalendarCard
          key={calendarUser.id}
          img={calendarUser.calendar.image || PLACEHOLDER_IMG}
          name={!isMenuCollapsed ? calendarUser.calendar.title : ''}
          link={`/calendar/${calendarUser.calendar.id}`}
          onDelete={() => handleDelete(calendarUser)}
          onEdit={() => handleEdit(calendarUser)}
        />
      ))}

      {calendarToDelete && (
        <DeleteCalendarModal
          onClose={handleCloseDeleteModal}
          calendar={calendarToDelete.calendar}
          onRemoveCalendar={handleRemoveCalendar}
        />
      )}

      {calendarToEdit && (
        <EditCalendarModal
          onClose={handleCloseEditModal}
          calendar={calendarToEdit.calendar}
          onEditCalendar={handleEditCalendar}
        />
      )}
    </ul>
  );
};

export default CalendarCardList;
