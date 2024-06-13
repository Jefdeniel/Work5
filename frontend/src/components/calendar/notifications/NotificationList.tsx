import { DateTime } from 'luxon';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Notification } from '../../../@types/Notification';

import useFetch from '../../../hooks/useFetch';
import Icon from '../../ui/Icon/Icon';
import NotificationCard from './NotificationCard/NotificationCard';

const NotificationList = ({ notifications, setNotifications }) => {
  const { t } = useTranslation(['calendar']);

  const [notificationId, setNotificationId] = useState<number>();

  const { fetchData: putNotification } = useFetch('PATCH', [
    'notifications',
    notificationId ? notificationId.toString() : '',
  ]);

  const handleUpdateSuccess = (
    notificationId: number,
    updatedNotification: Notification
  ) => {
    setNotifications((prevNotifications) =>
      prevNotifications
        .map((n) => (n.id === notificationId ? updatedNotification : n))
        .sort((a: Notification, b: Notification) => {
          if (a.is_new && !b.is_new) return -1;
          if (!a.is_new && b.is_new) return 1;
          return 0; // sort by is_new
        })
    );
  };

  const handleNewStatus = async (notificationId: number) => {
    setNotificationId(notificationId);
    const notification = notifications.find((n) => n.id === notificationId);
    if (!notification) return;

    const updatedNotification = {
      ...notification,
      is_new: notification.is_new ? false : true,
    };

    try {
      const response = await putNotification({}, updatedNotification);
      if (response.ok) {
        handleUpdateSuccess(notificationId, updatedNotification);
      }
    } catch (error) {
      toast.error(
        t('calendar:notifications.toasts.notification-updating-failed')
      );
    }
  };

  if (notifications.length === 0) {
    return (
      <div className={`d-flex flex-column align-items-center`}>
        <Icon
          src="/icons/notification-light.svg"
          alt="Notification icon"
          className={`w-110 mt-5 mb-4`}
        />

        <span className={`heading heading--lg text-center clr-primary-300`}>
          No notifications yet.
        </span>
      </div>
    );
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
          />
        );
      })}
    </Row>
  );
};

export default NotificationList;
