import { useTranslation } from 'react-i18next';
import Heading from '../../components/ui/Heading/Heading';
import useSetTitle from '../../hooks/setTitle';
import { useContext, useEffect, useState } from 'react';
import { CalendarContext } from '../../store/CalendarContext';
import useFetch from '../../hooks/useFetch';
import { toast } from 'react-toastify';

const CalendarOverviewPage = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar:calendar.title'));

  const contextUserCalendars = useContext(CalendarContext);
  const userCalendars = contextUserCalendars.calendars;
  console.log(userCalendars);

  // it now only works if a user has 1 calendar, not if the user has more calendars.
  // /api/calendars/?id=1&id=2&id=3
  const params = `?id=${userCalendars}`;
  const calendarIds = userCalendars.map((calendar) => calendar.id).join(',');

  const { fetchData: getCalendars } = useFetch('GET', ['calendars', params]);

  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        if (!userCalendars || userCalendars.length === 0) {
          return;
        }
        const response = await getCalendars();
        if (response.ok) {
          const data = await response.json();
          setCalendars(Array.isArray(data) ? data : [data]);
        } else {
          throw new Error('Failed to fetch calendars');
        }
      } catch (error) {
        console.error(t('calendar:error.fetchFailed'), error);
        toast.error(t('calendar:error.fetchFailed'));
      }
    };

    fetchCalendars();
  }, []);

  return (
    <>
      <Heading level={1}>{t('calendar:calendar.page')}</Heading>
      <p>Calendar Overview Page</p>
      <Heading level={2}>DB Fetch</Heading>
      <ul>
        {calendars.map((calendar) => (
          <li key={calendar.id}>{calendar.title}</li>
        ))}
      </ul>
    </>
  );
};

export default CalendarOverviewPage;
