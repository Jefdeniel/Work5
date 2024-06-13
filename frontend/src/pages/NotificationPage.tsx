import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useSetTitle from '../hooks/setTitle';

import { Notification } from '../@types/Notification';

import NotificationList from '../components/calendar/notifications/NotificationList';
import Badge from '../components/ui/Badge/Badge';
import Button from '../components/ui/Button/Button';
import Heading from '../components/ui/Heading/Heading';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

const NotificationPage = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar:notifications.title'));
  const { user_id } = useAuth();
  console.log('user_id:', user_id);

  // Fetch notifications
  const { fetchData: deleteNotifications, loading: isDeleteLoading } = useFetch(
    'DELETE',
    ['notifications', user_id ? user_id.toString() : '']
  );

  const { fetchData: getNotifications, loading: isGetLoading } = useFetch(
    'GET',
    ['notifications', 'user', user_id ? user_id.toString() : '']
  );

  // State
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        if (response.ok) {
          const data = await response.json();
          data.sort((a: Notification, b: Notification) => {
            if (a.is_new && !b.is_new) return -1;
            if (!a.is_new && b.is_new) return 1;
            return 0;
          }); // sort by is_new
          setNotifications(data);
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

  const handleNotificationDelete = async () => {
    try {
      const response = await deleteNotifications();
      if (response.ok) {
        setNotifications([]);
      } else {
        throw new Error('Failed to delete notifications');
      }
    } catch (error) {
      console.error('Error deleting notifications:', error);
      toast.error(error.message);
    }
  };

  if (isGetLoading || isDeleteLoading) {
    return <div>{t('common:loading')}</div>;
  }

  return (
    <div>
      <Heading className={`heading--lg clr-primary mb-small`} level={1}>
        {t('calendar:notifications.title')}
      </Heading>
      <p className={`mb-large`}>{t('calendar:notifications.description')}</p>
      <div className={`mb-xlarge`}>
        <span className={`mb-small`}>
          {t('calendar:notifications.clickOnCircle')}
        </span>

        <Row className={`notifications-top`}>
          <Col className={`mb-large d-flex justify-content-end`}>
            <div>
              <Button
                isBig={true}
                className={`btn--bordered-danger`}
                text="Delete"
                notification={<Badge color="red">{notifications.length}</Badge>}
                onClick={handleNotificationDelete}
              />
            </div>
          </Col>
        </Row>
      </div>

      <NotificationList
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </div>
  );
};

export default NotificationPage;

// const [yourColor, setYourColor] = useState<string>(Colors.Primary300);
// const [otherColor, setOtherColor] = useState<string>(Colors.Error300);
// const [yourColorPickerVisible, setYourColorPickerVisible] =
//   useState<boolean>(false);
// const [otherColorPickerVisible, setOtherColorPickerVisible] =
//   useState<boolean>(false);

// const handleYourColorChange = (color: string) => {
//   setYourColor(color);
//   setYourColorPickerVisible(false);
// };

// const handleOtherColorChange = (color: string) => {
//   setOtherColor(color);
//   setOtherColorPickerVisible(false);
// };

{
  /* <Col xs={12} sm={6} className={`mb-large d-flex gap-base`}>
  <CircleWithTitle
    color={yourColor}
    title={t('calendar:notifications.forYou')}
    onClick={() => setYourColorPickerVisible(true)}
  />
  {yourColorPickerVisible && (
    <ColorPicker
      color={yourColor}
      title={t('calendar:notifications.forYou')}
      onChange={handleYourColorChange}
    />
  )}

  <CircleWithTitle
    color={otherColor}
    title={t('calendar:notifications.forOthers')}
    onClick={() => setOtherColorPickerVisible(true)}
  />
  {otherColorPickerVisible && (
    <ColorPicker
      color={otherColor}
      title={t('calendar:notifications.forOthers')}
      onChange={handleOtherColorChange}
    />
  )}
</Col>; */
}
