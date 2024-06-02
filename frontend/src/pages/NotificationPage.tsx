import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { Colors } from '../@types/Colors';
import useSetTitle from '../hooks/setTitle';

import Button from '../components/ui/Button/Button';
import Heading from '../components/ui/Heading/Heading';
import CircleWithTitle from '../components/ui/Circle/CircleWithTitle';
import NotificationList from '../components/calendar/notifications/NotificationList';
import ColorPicker from '../components/calendar/notifications/ColorPicker/ColorPicker';
import Badge from '../components/ui/Badge/Badge';

const NotificationPage = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar:notifications.title'));

  const [yourColor, setYourColor] = useState<string>(Colors.Primary300);
  const [otherColor, setOtherColor] = useState<string>(Colors.Error300);
  const [yourColorPickerVisible, setYourColorPickerVisible] =
    useState<boolean>(false);
  const [otherColorPickerVisible, setOtherColorPickerVisible] =
    useState<boolean>(false);

  const handleYourColorChange = (color: string) => {
    setYourColor(color);
    setYourColorPickerVisible(false);
  };

  const handleOtherColorChange = (color: string) => {
    setOtherColor(color);
    setOtherColorPickerVisible(false);
  };

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
          <Col xs={12} sm={6} className={`mb-large d-flex gap-base`}>
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
          </Col>

          <Col className={`mb-large d-flex justify-content-end`}>
            <div>
              <Button
                isBig={true}
                className={`btn--bordered-danger`}
                text="Delete"
                notification={<Badge color="red">2</Badge>}
              />
            </div>
          </Col>
        </Row>
      </div>
      <NotificationList />
    </div>
  );
};

export default NotificationPage;
