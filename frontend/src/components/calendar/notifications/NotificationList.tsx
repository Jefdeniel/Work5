import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';

import NotificationCard from './NotificationCard/NotificationCard';
import LoadingScreen from '../../ui/Loading/LoadingScreen';

const NotificationList = () => {
  const { t } = useTranslation(['calendar']);
  const { user_id } = useAuth();

  const { fetchData: getNotifications, loading: isLoading } = useFetch('GET', [
    'notifications',
  ]);
  const { fetchData: putNotification } = useFetch('PUT', [
    'notifications',
    user_id,
  ]);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
          // TODO: if 0, line 76
        } else if (notifications.length === 0) {
          //
        } else {
          throw new Error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        toast.error(error.message);
      }
    };

    fetchNotifications();
  }, []);

  const handleNewStatus = async (notificationId) => {
    // TODO: Fix this
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
        throw new Error(
          t('calendar:notifications.toasts.notification-update-failed')
        );
        toast.error(
          t('calendar:notifications.toasts.notification-update-failed')
        );
      }
    } catch (error) {
      console.error(
        t('calendar:notifications.toasts.notification-updating-failed'),
        error
      );
      toast.error(
        t('calendar:notifications.toasts.notification-updating-failed')
      );
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
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
