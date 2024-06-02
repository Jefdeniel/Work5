import { Row, Col } from 'react-bootstrap';

import useAuth from '../../../../hooks/useAuth';
import Heading from '../../../ui/Heading/Heading';
import { Colors } from '../../../../@types/Colors';

// TODO: make dynamic (first authorisation)
const ProfilePageHeader = () => {
  const auth = useAuth();
  console.log(auth);

  return (
    <Row className="p-5 --br-lg" style={{ backgroundColor: Colors.Primary200 }}>
      <Col className={`d-flex justify-content-center`}>
        <div className={`d-flex flex-column justify-content-center`}>
          <Heading level={2} className={`heading--lg clr-dark highlight`}>
            John Doe
          </Heading>

          <Heading level={2} className={`heading--sm clr-primary`}>
            johndoe@gmail.com
          </Heading>
        </div>
      </Col>

      <Col className={`flexCenter`}>
        <img
          src="/logo.jpg"
          alt="Profile"
          height={100}
          width={100}
          style={{ objectFit: 'cover', borderRadius: 'var(--br-full)' }}
          className="profile-pic"
        />
      </Col>
    </Row>
  );
};

export default ProfilePageHeader;
