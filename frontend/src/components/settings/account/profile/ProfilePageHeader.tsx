import { Col, Row } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import { Colors } from '../../../../@types/Colors';
import useAuth from '../../../../hooks/useAuth';
import useFetch from '../../../../hooks/useFetch';
import Heading from '../../../ui/Heading/Heading';

interface UserData {
  first_name?: string;
  last_name?: string;
  email?: string;
}

const ProfilePageHeader = () => {
  const { user_id } = useAuth();

  const { fetchData: getUserData } = useFetch('GET', [
    'users',
    user_id?.toString() || '',
  ]);

  const [userData, setUser] = useState<UserData | null>(null);

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
    return `${userData?.first_name || ''} ${userData?.last_name || ''}`;
  }, [userData]);

  return (
    <Row className="p-5 --br-lg" style={{ backgroundColor: Colors.Primary200 }}>
      <Col className={`d-flex justify-content-center`}>
        <div className={`d-flex flex-column justify-content-center`}>
          <Heading level={2} className={`heading--lg clr-dark highlight`}>
            {fullName}
          </Heading>

          <Heading level={2} className={`heading--sm clr-primary`}>
            {userData?.email || ''}
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
