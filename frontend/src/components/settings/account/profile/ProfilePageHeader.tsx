import { Row, Col } from 'react-bootstrap';
import { Colors } from '../../../../@types/Colors';
import Heading from '../../../ui/Heading/Heading';

// TODO: make dynamic (first authorisation)
const ProfilePageHeader = () => {
  return (
    <Row className="p-4 --br-lg" style={{ backgroundColor: Colors.Primary200 }}>
      <Col>
        <Heading level={1}>John Doe</Heading>
        <Heading level={2} style={{ color: Colors.Primary400 }}>
          johndoe@gmail.com
        </Heading>
      </Col>
      <Col className="flexCenter">
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
