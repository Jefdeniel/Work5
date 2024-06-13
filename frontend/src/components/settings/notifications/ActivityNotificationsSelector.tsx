import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  children: React.ReactNode;
}

const ActivityNotificationSelector = ({ children }: Props) => {
  const { t } = useTranslation(['settings']);

  return (
    <Row className="d-flex flex-row justify-content-between">
      <Col>
        <span className="title">
          {t('settings:notifications.activityNotification')}
        </span>

        <small className="description">
          {t('settings:notifications.activityNotificationDescription')}
        </small>
      </Col>

      <Col className="d-flex flex-row justify-content-end">{children}</Col>
    </Row>
  );
};

export default ActivityNotificationSelector;
