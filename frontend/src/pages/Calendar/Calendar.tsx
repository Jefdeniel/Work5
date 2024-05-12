import { useEffect } from 'react';
import useSetTitle from '../../hooks/setTitle';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/ui/Loading/Spinner';

const Calendar = () => {
  useSetTitle('Calendar');

  const { fetchData: getCalendars, loading: isLoading } = useFetch('GET', [
    'calendars',
  ]);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const calendars = await getCalendars();
        if (calendars.status === 200) {
        } else {
          console.error('Error fetching calendars:', calendars.status);
        }
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    };

    fetchCalendars();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <div>{!isLoading ? 'Calendar' : 'Loading...'}</div>;
};

export default Calendar;
