import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CalendarUser } from '../../../@types/Calendar';

import { PLACEHOLDER_IMG } from '../../../constants/placeholders';
import useAuth from '../../../hooks/useAuth';
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
  const { t } = useTranslation(['general']);
  const calendarContext = useContext(CalendarContext);

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

  useEffect(() => {
    setFilteredCalendars(calendarContext.calendars);
  }, [calendarContext.calendars]);

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

  // Handlers
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
