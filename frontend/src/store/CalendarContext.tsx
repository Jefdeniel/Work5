import { createContext, useEffect, useState, ReactNode } from 'react';
import { CalendarUser } from '../@types/Calendar';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

interface CalendarContextType {
  calendars: CalendarUser[];
  setCalendars: React.Dispatch<React.SetStateAction<CalendarUser[]>>;
}

export const CalendarContext = createContext<CalendarContextType>({
  calendars: [],
  setCalendars: () => {},
});

export const CalendarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user_id } = useAuth();
  const [calendars, setCalendars] = useState<CalendarUser[]>([]);

  const { fetchData: getCalendarUsers } = useFetch('GET', [
    'calendar_users',
    'user_id',
    user_id ? user_id.toString() : '',
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCalendarUsers();

      if (response.ok) {
        const data = (await response.json()) as CalendarUser[];
        setCalendars(data);
      } else {
        console.error('Failed to fetch calendar users');
      }
    };

    if (user_id) {
      fetchData();
    }
  }, [user_id]);

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
