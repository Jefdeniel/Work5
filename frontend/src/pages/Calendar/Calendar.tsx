import { useEffect } from 'react';
import useSetTitle from '../../hooks/setTitle';
import { Col, Row } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';

import Heading from '../../components/ui/Heading/Heading';
import BigCalendar from '../../components/calendar/BigCalendar/BigCalendar';
import ProfilePicture from '../../components/ui/ProfilePicture/ProfilePicture';
import Icon from '../../components/ui/Icon/Icon';
import LoadingScreen from '../../components/ui/Loading/LoadingScreen';

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
            Calendar page
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

      <BigCalendar
        defaultView="week"
        views={['day', 'week', 'month']}
        timeslots={2}
      />
    </>
  );
};

export default Calendar;
