import { useCallback, useEffect, useState } from 'react';
import { CalendarUser } from '../../../@types/Calendar';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import CalendarCard from './CalendarCard';
import Input from '../../ui/Input/Input';
import { useTranslation } from 'react-i18next';

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
  const { fetchData: fetchCalendars } = useFetch('GET', [
    'calendar_users',
    'user_id',
    user_id?.toString() ?? '',
  ]);

  const [data, setData] = useState<CalendarUser[]>([]);
  const [filteredCalendars, setFilteredCalendars] = useState<CalendarUser[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Test loop for user avatars in calendar card
  const userAvatars = ['/icons/user-profile.svg', ''];

  const fetchCalendarsMemoized = useCallback(fetchCalendars, [fetchCalendars]);

  useEffect(() => {
    const fetchCalendarsData = async () => {
      try {
        const response = await fetchCalendarsMemoized();
        const result: CalendarUser[] = await response.json();
        setData(result);
        setFilteredCalendars(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCalendarsData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filteredData = data.filter((calendarUser) => {
      const calendarTitle = calendarUser.calendar.title.toLowerCase();
      return calendarTitle.includes(searchValue);
    });
    setFilteredCalendars(filteredData);
  };

  const PLACEHOLDER_IMG =
    'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtNDY3YmF0Y2gyLWNhbGVuZGFyLTAwMS5wbmc.png';

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
        userAvatars={userAvatars}
        link="/calendar/google"
      />

      {filteredCalendars.map((calendarUser) => (
        <CalendarCard
          key={calendarUser.id}
          img={
            calendarUser.calendar.image
              ? calendarUser.calendar.image
              : PLACEHOLDER_IMG
          }
          name={!isMenuCollapsed ? calendarUser.calendar.title : ''}
          link={`/calendar/${calendarUser.calendar.id}`}
        />
      ))}
    </ul>
  );
};

export default CalendarCardList;
