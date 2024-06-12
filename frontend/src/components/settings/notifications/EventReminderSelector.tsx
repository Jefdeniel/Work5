import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  children: React.ReactNode;
}

const EventReminderSelector = ({ children }: Props) => {
  const { t } = useTranslation(['settings']);

  return (
    <Row className="mb-4 d-flex flex-row justify-content-between align-items-center">
      <Col>
        <span className="title">
          {t('settings:notifications.eventReminder')}
        </span>

        <small className="description">
          {t('settings:notifications.eventReminderDescription')}
        </small>
      </Col>

      <Col className="d-flex flex-row justify-content-end">{children}</Col>
    </Row>
  );
};

export default EventReminderSelector;
