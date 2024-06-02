import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  children: React.ReactNode;
}

const ActivityNotificationSelector = ({ children }: Props) => {
  const { t } = useTranslation(['settings']);

  return (
    <Row className="d-flex flex-row justify-content-between">
      <Col className="p-0">
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
      <Col className="d-flex flex-row justify-content-end">{children}</Col>
    </Row>
  );
};

export default ActivityNotificationSelector;
