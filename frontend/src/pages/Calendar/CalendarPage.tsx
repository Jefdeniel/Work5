import { useEffect } from 'react';
import useSetTitle from '../../hooks/setTitle';
import { Col, Row } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';

import Heading from '../../components/ui/Heading/Heading';
import ProfilePicture from '../../components/ui/ProfilePicture/ProfilePicture';
import Icon from '../../components/ui/Icon/Icon';
import LoadingScreen from '../../components/ui/Loading/LoadingScreen';
import CalendarView from '../../components/calendar/BigCalendar/CalendarView';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
      <div>{!isLoading ? '' : <LoadingScreen />}</div>

      <Heading className={`sr-only`} level={1}>
        {t('calendar:calendar.page')}
      </Heading>

      <CalendarView />
    </>
  );
};

export default CalendarPage;
