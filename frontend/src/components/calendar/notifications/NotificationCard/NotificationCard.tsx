import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import NewMessage from '../../../ui/NewMessage/NewMessage';
import NotificationCardProfileImg from './NotificationCardProfileImg';
import Badge from '../../../ui/Badge/Badge';

import './NotificationCard.scss';

interface Props {
  title: string;
  // person?: string;
  color?: string;
  timeFrom: string;
  timeTo: string;
  isNew: boolean;
  onClick?: () => void;
}

const NotificationCard = ({
  title,
  // person,
  color,
  timeFrom,
  timeTo,
  isNew,
  onClick,
}: Props) => {
  const { t } = useTranslation(['calendar']);

  return (
    <div className={`card`} onClick={onClick}>
      {isNew && <NewMessage />}
      <Row className={`card__content`}>
        <Col className={`card__text`} xs={10}>
          <span className={`card__title heading heading--sm`}>{title}</span>

          <NotificationCardProfileImg />
        </Col>

        <Col className={`card__time`}>
          {isNew && (
            <Badge className={`message-text`} color="red">
              {t('calendar:notifications.isNew')}
            </Badge>
          )}

          <span>{timeFrom}</span>

          <div className={`card__time-line`}></div>

          <span>{timeTo}</span>
        </Col>
      </Row>

      <div className={`card__color`} style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default NotificationCard;
