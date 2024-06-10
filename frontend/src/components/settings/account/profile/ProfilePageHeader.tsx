import { Col, Row } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';

import { UserData } from '../../../../@types/UserData';
import { Colors } from '../../../../@types/Colors';
import useAuth from '../../../../hooks/useAuth';
import useFetch from '../../../../hooks/useFetch';
import Heading from '../../../ui/Heading/Heading';

const ProfilePageHeader = () => {
  const { user_id } = useAuth();

  const { fetchData: getUserData } = useFetch('GET', [
    'users',
    user_id?.toString() || '',
  ]);

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, []);

  const fullName = useMemo(() => {
    return `${user?.first_name || ''} ${user?.last_name || ''}`;
  }, [user]);

  return (
    <Row className="p-5 --br-lg" style={{ backgroundColor: Colors.Primary200 }}>
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
