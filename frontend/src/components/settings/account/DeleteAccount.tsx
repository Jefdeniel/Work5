import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button/Button';
import { Col, Row } from 'react-bootstrap';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick: () => void;
}

const DeleteAccount = ({ className, onClick }: Props) => {
  const { t } = useTranslation(['settings']);

  return (
    <Row className="d-flex flex-row justify-content-between">
      <Col>
        <span className="heading heading--sm clr-primary d-block">
          {t('settings:account.deleteAccount')}
        </span>
        <small className="description">
          {t('settings:account.deleteAccountDescription')}
        </small>
      </Col>

      <Col className={`d-flex justify-content-end`}>
        <Button className={`${className}`} isOutline={true} onClick={onClick}>
          {t('settings:account.deleteAccount')}
        </Button>
      </Col>
    </Row>
  );
};

export default DeleteAccount;
