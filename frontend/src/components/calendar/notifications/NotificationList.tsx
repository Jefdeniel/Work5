import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NotificationCard from './NotificationCard/NotificationCard';
import useFetch from '../../../hooks/useFetch';
import { DateTime } from 'luxon';
import { Row } from 'react-bootstrap';
import LoadingScreen from '../../ui/Loading/LoadingScreen';
import useAuth from '../../../hooks/useAuth';

const NotificationList = () => {
  const { user_id } = useAuth();

  const { fetchData: getNotifications } = useFetch('GET', ['notifications']);
  const { fetchData: putNotification } = useFetch('PUT', [
    'notifications',
    user_id,
  ]);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          throw new Error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError(error.message);
        toast.error('Error fetching notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleNewStatus = async (notificationId) => {
    console.log('handleNewStatus called');
    const notification = notifications.find((n) => n.id === notificationId);
    if (!notification) return;

    const updatedNotification = {
      ...notification,
      is_new: !notification.is_new,
    };

    try {
      const response = await putNotification({}, updatedNotification);
      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((n) =>
            n.id === notificationId ? updatedNotification : n
          )
        );
      } else {
        throw new Error('Failed to update notification');
      }
    } catch (error) {
      console.error('Error updating notification:', error);
      toast.error('Error updating notification');
    }
  };

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
            onClick={() => handleNewStatus(notification.id)}
            isNew={notification.is_new}
            color={notification.color}
          />
        );
      })}
    </Row>
  );
};

export default NotificationList;
