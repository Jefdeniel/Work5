import { useCallback, useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import CalendarCard from './CalendarCard';

interface Calendar {
  id: number;
  title: string;
  description: string;
  img: string | null;
  owner: number;
  date_start: string | null;
  date_stop: string | null;
}

interface CalendarUser {
  id: number;
  user: number;
  calendar: Calendar;
  role: string;
  created_at: string;
}

const CalendarCardList = () => {
  const { user_id } = useAuth();
  const { fetchData: fetchCalendars } = useFetch('GET', [
    'calendar_users',
    'user_id',
    user_id?.toString() ?? '',
  ]);

  const [data, setData] = useState<CalendarUser[]>([]);

  const fetchCalendarsMemoized = useCallback(fetchCalendars, [fetchCalendars]);

  useEffect(() => {
    const fetchCalendarsData = async () => {
      try {
        const response = await fetchCalendarsMemoized();
        const result: CalendarUser[] = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCalendarsData();
  }, []);

  const PLACEHOLDER_IMG =
    'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtNDY3YmF0Y2gyLWNhbGVuZGFyLTAwMS5wbmc.png';

  return (
    <div>
      {data.map((calendarUser) => (
        <CalendarCard
          key={calendarUser.id}
          img={
            calendarUser.calendar.img
              ? calendarUser.calendar.img
              : PLACEHOLDER_IMG
          }
          name={calendarUser.calendar.title}
          link={`/calendar/${calendarUser.calendar.id}`}
        />
      ))}
    </div>
  );
};

export default CalendarCardList;
