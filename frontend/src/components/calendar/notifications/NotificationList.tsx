import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NotificationCard from './NotificationCard/NotificationCard';
import useFetch from '../../../hooks/useFetch';
import { DateTime } from 'luxon';
import { Row } from 'react-bootstrap';
import LoadingScreen from '../../ui/Loading/LoadingScreen';
import useAuth from '../../../hooks/useAuth';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const { fetchData: getNotifications } = useFetch('GET', ['notifications/']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = useAuth();

  useEffect(() => {
    getNotifications()
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch notifications');
        }
      })
      .then((data) => {
        setNotifications(data);
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
    return <LoadingScreen />;
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
