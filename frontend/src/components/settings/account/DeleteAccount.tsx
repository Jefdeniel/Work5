import { useTranslation } from 'react-i18next';
import Col from '../../ui/Flex/Col';
import Row from '../../ui/Flex/Row';
import Button from '../../ui/Button/Button';

const DeleteAccount = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation(['settings']);

  return (
    <Row justifyContent="between">
      <Col>
        <span className="title">{t('settings:account.deleteAccount')}</span>
        <small className="description">
          {t('settings:account.deleteAccountDescription')}
        </small>
      </Col>
      <Col>
        <Button isDanger={true} isOutline={true} onClick={onClick}>
          {t('settings:account.deleteAccount')}
        </Button>
      </Col>
    </Row>
  );
};

export default DeleteAccount;
