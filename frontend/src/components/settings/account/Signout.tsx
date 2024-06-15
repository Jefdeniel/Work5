import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import Button from '../../ui/Button/Button';
import { Col, Row } from 'react-bootstrap';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Signout = ({ className }: Props) => {
  const { t } = useTranslation(['settings']);
  const auth = useAuth();

  const { fetchData: logout } = useFetch('POST', ['logout']);

  const handleSignout = async () => {
    auth.logout();
    await logout({});
  };

  return (
    <Row className={`mb-base`}>
      <Col>
        <span className="heading heading--sm clr-primary d-block">
          {t('settings:account.SignOut')}
        </span>
        <small className="description">
          {t('settings:account.SignOutDescription')}
        </small>
      </Col>

      <Col className={`d-flex justify-content-end`}>
        <Button
          className={`${className}`}
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
