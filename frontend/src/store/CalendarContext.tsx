import { createContext, useEffect, useState } from 'react';
import { Calendar } from '../@types/Calendar';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

interface CalendarContextType {
  calendars: Calendar[];
  setCalendars: (
    calendars: Calendar[] | ((prev: Calendar[]) => Calendar[])
  ) => void;
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
  const [calendars, setCalendars] = useState<Calendar[]>([]);

  const { fetchData: getCalendars } = useFetch('GET', [
    'calendars',
    'owner_id',
    user_id ? user_id.toString() : '',
  ]);

  useEffect(() => {
    const fetchCalendars = async () => {
      if (!user_id) return;
      const response = await getCalendars();

      if (response.ok) {
        const data = (await response.json()) as Calendar[];
        setCalendars(data);
      } else {
        console.error('Failed to fetch calendars');
      }
    };

    void fetchCalendars();
  }, []);

  const addCalendarToState = (
    newCalendars: Calendar[] | ((prev: Calendar[]) => Calendar[])
  ) => {
    setCalendars((prevCalendars) => [
      ...prevCalendars,
      ...(typeof newCalendars === 'function'
        ? newCalendars(prevCalendars)
        : newCalendars),
    ]);
  };

  const contextValue: CalendarContextType = {
    calendars,
    setCalendars: addCalendarToState,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
