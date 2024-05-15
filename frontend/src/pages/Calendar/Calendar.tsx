import { useEffect } from 'react';
import useSetTitle from '../../hooks/setTitle';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/ui/Loading/Spinner';
import { Col, Row } from 'react-bootstrap';
import Heading from '../../components/ui/Heading/Heading';
import BigCalendar from '../../components/ui/BigCalendar/BigCalendar';

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

  return (
    <>
      <div>{!isLoading ? '' : 'Loading...'}</div>

      <Row className={`mb-xlarge`}>
        <Col>
          <Heading className={`sr-only`} level={1}>
            Calendar page
          </Heading>
        </Col>

        <Col className={`d-flex justify-content-end`}>
          <ul className={`d-flex gap-3`}>
            <li>Person</li>
            <li>Person</li>
            <li>Person</li>
            <li>Person</li>
          </ul>
        </Col>
      </Row>

      <BigCalendar defaultView="week" views={['day', 'week', 'month']} />
    </>
  );
};

export default Calendar;
