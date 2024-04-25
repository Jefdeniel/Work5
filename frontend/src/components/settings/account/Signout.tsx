import { useTranslation } from 'react-i18next';
import Col from '../../ui/Flex/Col';
import Row from '../../ui/Flex/Row';
import Button from '../../ui/Button/Button';
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';

const Signout = () => {
  const { t } = useTranslation(['settings']);
  const auth = useAuth();

  // TODO: write function in backend
  const { fetchData: logout } = useFetch('POST', ['logout']);

  const handleSignout = async () => {
    auth.logout();

    await logout({});
  };

  return (
    <Row justifyContent="between">
      <Col>
        <span className="title">{t('settings:account.SignOut')}</span>
        <small className="description">
          {t('settings:account.SignOutDescription')}
        </small>
      </Col>
      <Col>
        <Button isDanger={true} onClick={handleSignout}>
          {t('settings:account.SignOut')}
        </Button>
      </Col>
    </Row>
  );
};

export default Signout;
