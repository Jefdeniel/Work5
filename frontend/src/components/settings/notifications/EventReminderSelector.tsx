import { Col, Row } from 'react-bootstrap';
import Switch from '../../ui/Switch/Switch';
import { useTranslation } from 'react-i18next';

interface Props {
  eventReminderEnabled: boolean;
  onChange: (value: boolean) => void;
}

const EventReminderSelector = ({ eventReminderEnabled, onChange }: Props) => {
  const { t } = useTranslation(['settings']);

  const handleEventReminderChange = (value: boolean) => {
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
          checked={eventReminderEnabled}
          onChange={handleEventReminderChange}
        />
      </Col>
    </Row>
  );
};

export default EventReminderSelector;
