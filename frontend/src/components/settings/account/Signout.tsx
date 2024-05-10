import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import Button from '../../ui/Button/Button';
import { Col, Row } from 'react-bootstrap';

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
    <Row>
      <Col>
        <span className="title">{t('settings:account.SignOut')}</span>
        <small className="description">
          {t('settings:account.SignOutDescription')}
        </small>
      </Col>
      <Col>
        <Button
          isDanger={true}
          isOutline={true}
          text={t('settings:account.SignOut')}
          onClick={handleSignout}
        />
      </Col>
    </Row>
  );
};

export default Signout;
