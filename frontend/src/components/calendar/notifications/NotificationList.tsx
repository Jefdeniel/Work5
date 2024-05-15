import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NotificationCard from './NotificationCard/NotificationCard';
import useFetch from '../../../hooks/useFetch';
import { DateTime } from 'luxon';
import { Row } from 'react-bootstrap';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const { fetchData: getNotifications } = useFetch('GET', ['notifications']);

  useEffect(() => {
    getNotifications()
      .then((response) => {
        if (!response.ok) {
          toast.error('Failed to fetch notifications');
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setNotifications(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        toast.error('Error fetching notifications');
      });
  }, []);

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
            isNew={notification.isNew} // TODO: Implement logic (with passing states and pushing to db ) for new notifications
          />
        );
      })}
    </Row>
  );
};

export default NotificationList;
