import { Col } from 'react-bootstrap';
import Logo from '../../ui/Logo';
import './AuthBanner.scss';

const AuthBanner = () => {
  return (
    <Col sm={12} md={6} className="auth-banner">
      <img
        src="/img/bg/auth.webp"
        alt="Image about smart calendar application"
        className={`auth-banner__img`}
      />

      <Logo width="50px" height="50px" className={`auth-banner__logo`} />
    </Col>
  );
};

export default AuthBanner;
