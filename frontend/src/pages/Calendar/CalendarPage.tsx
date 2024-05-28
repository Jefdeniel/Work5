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

const Calendar = () => {
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

  const calendarUsers = [
    { id: 1, name: 'Person 1', avatar: '/img/test-img.jpg' },
    { id: 2, name: 'Person 2', avatar: '' },
    { id: 3, name: 'Person 3', avatar: '/img/test-img.jpg' },
    { id: 4, name: 'Person 4', avatar: '/img/test-img.jpg' },
  ];

  return (
    <>
      <div>{!isLoading ? '' : <LoadingScreen />}</div>

      <Row className={`mb-xlarge`}>
        <Col xs={6}>
          <Heading className={`sr-only`} level={1}>
            {t('calendar:calendar.page')}
          </Heading>
        </Col>

        <Col xs={6} className={`p-0 d-flex justify-content-end`}>
          <ul className={`d-flex gap-2`}>
            {calendarUsers.map((user) => (
              <li key={user.id}>
                {user.avatar ? (
                  <ProfilePicture
                    isSmall
                    src={user.avatar}
                    alt={`Avatar of ${user.name}`}
                  />
                ) : (
                  <Icon src="/icons/user-profile.svg" alt="User profile icon" />
                )}
              </li>
            ))}
          </ul>
        </Col>
      </Row>

      <CalendarView />
    </>
  );
};

export default Calendar;
