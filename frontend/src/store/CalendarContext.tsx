import { createContext, useEffect, useState } from 'react';
import { CalendarUser } from '../@types/Calendar';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

interface CalendarContextType {
  calendars: number[];
  setCalendars: (calendars: number[]) => void;
}

export const CalendarContext = createContext<CalendarContextType>({
  calendars: [],
  setCalendars: () => {},
});

export const CalendarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user_id } = useAuth();

  const [calendars, setCalendars] = useState<number[]>([]);

  const { fetchData: getCalendarUsers } = useFetch('GET', [
    'calendar_users',
    'user_id',
    user_id,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCalendarUsers();

      if (response.ok) {
        const data = (await response.json()) as CalendarUser[];
        setCalendars(data.map((calendarUser) => calendarUser.calendar));
      }
    };

    calendars && void fetchData();
    console.log(calendars.length);
  }, []);

  const contextValue: CalendarContextType = {
    calendars,
    setCalendars,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
