import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button/Button';
import { Col, Row } from 'react-bootstrap';

const DeleteAccount = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation(['settings']);

  return (
    <Row className="d-flex flex-row justify-content-between ">
      <Col>
        <span className="title">{t('settings:account.deleteAccount')}</span>
        <small className="description">
          {t('settings:account.deleteAccountDescription')}
        </small>
      </Col>
      <Col>
        <Button isOutline={true} onClick={onClick}>
          {t('settings:account.deleteAccount')}
        </Button>
      </Col>
    </Row>
  );
};

export default DeleteAccount;
