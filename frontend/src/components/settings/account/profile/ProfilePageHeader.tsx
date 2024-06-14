import { Col, Row } from 'react-bootstrap';
import { useMemo } from 'react';

import { UserData } from '../../../../@types/UserData';
import { Colors } from '../../../../@types/Colors';

import Heading from '../../../ui/Heading/Heading';

import './ProfilePageHeader.scss';

interface Props {
  user: UserData | null;
}

const ProfilePageHeader = ({ user }: Props) => {
  const fullName = useMemo(() => {
    return `${user?.first_name || ''} ${user?.last_name || ''}`;
  }, [user]);

  return (
    <Row
      className="profile-header"
      style={{ backgroundColor: Colors.Primary200 }}
    >
      <Col className={`d-flex justify-content-center`}>
        <div className={`d-flex flex-column justify-content-center`}>
          <Heading level={2} className={`heading--lg clr-dark highlight`}>
            {fullName || 'User'}
          </Heading>

          <Heading level={2} className={`heading--sm clr-primary`}>
            {user?.email || ''}
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
