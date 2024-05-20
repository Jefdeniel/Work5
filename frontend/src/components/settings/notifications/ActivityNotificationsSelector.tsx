import { useTranslation } from 'react-i18next';
import Switch from '../../ui/Switch/Switch';
import { Col, Row } from 'react-bootstrap';

interface Props {
  activityNotificationEnabled: boolean;
  onChange: (value: boolean) => void;
}

const ActivityNotification = ({
  activityNotificationEnabled,
  onChange,
}: Props) => {
  const { t } = useTranslation(['settings']);
  const handleActivityNotificationChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <Row className="d-flex flex-row justify-content-between ">
      <Col>
        <Col className="d-flex flex-row align-items-center">
          <span className="title">
            {t('settings:notifications.activityNotification')}
          </span>
        </Col>
        <Col className="d-flex flex-row align-items-center">
          <small className="description">
            {t('settings:notifications.activityNotificationDescription')}
          </small>
        </Col>
      </Col>
      <Col>
        <Switch
          checked={activityNotificationEnabled}
          onChange={handleActivityNotificationChange}
        />
      </Col>
    </Row>
  );
};

export default ActivityNotification;
