import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NotificationCard from './NotificationCard/NotificationCard';
import useFetch from '../../../hooks/useFetch';
import { DateTime } from 'luxon';
import { Row } from 'react-bootstrap';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const { fetchData: getNotifications } = useFetch('GET', [
    'api/notifications/',
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getNotifications()
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received data:', data); // Log the data to understand its structure
        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          throw new Error('Received data is not an array');
        }
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        setError(error.message);
        toast.error('Error fetching notifications');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p> loading</p>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (notifications.length === 0) {
    return <h1>No notifications: length 0</h1>;
  }

  return (
    <Row>
      {notifications.map((notification) => {
        const notificationStart = DateTime.fromISO(
          notification.date_start
        ).toFormat('HH:mm');
        const notificationStop = DateTime.fromISO(
          notification.date_stop
        ).toFormat('HH:mm');

        return (
          <NotificationCard
            key={notification.id}
            title={notification.title}
            timeFrom={notificationStart}
            timeTo={notificationStop}
            isNew={notification.isNew} // TODO: Implement logic (with passing states and pushing to db) for new notifications
          />
        );
      })}
    </Row>
  );
};

export default NotificationList;
