import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import CalendarView from '../../components/calendar/BigCalendar/CalendarView';
import Heading from '../../components/ui/Heading/Heading';
import LoadingScreen from '../../components/ui/Loading/LoadingScreen';
import useSetTitle from '../../hooks/setTitle';
import useFetch from '../../hooks/useFetch';

const CalendarPage = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar:calendar.title'));

  const { fetchData: getCalendars, loading: isLoading } = useFetch('GET', [
    'calendars',
  ]);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const calendars = await getCalendars();
        if (calendars.status === 200) {
        } else {
          console.error(
            t('calendar:error.fetchingCalendars'),
            ': ',
            calendars.status
          );
          toast.error(t('calendar:error.fetchingCalendars'));
        }
      } catch (error) {
        console.error(t('calendar:error.fetchFailed'), error);
        toast.error(t('calendar:error.fetchFailed'));
      }
    };

    fetchCalendars();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Heading className={`sr-only`} level={1}>
        {t('calendar:calendar.page')}
      </Heading>

      <CalendarView />
    </>
  );
};

export default CalendarPage;
