import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import Icon from '../Icon/Icon';

import './ProfileButton.scss';

interface Props {
  userFirstName?: string;
  userAvatar?: string;
}

const ProfileButton = (props: Props) => {
  const { t } = useTranslation(['settings']);
  const { user_id } = useAuth();

  const { fetchData: getUserData } = useFetch('GET', [
    'users',
    user_id ? user_id.toString() : '',
  ]);

  const [userFirstName, setUserFirstName] = useState<string | undefined>(
    props.userFirstName
  );
  const [userAvatar, setUserAvatar] = useState<string | undefined>(
    props.userAvatar
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserData();
        if (response.ok) {
          const data = await response.json();
          setUserFirstName(data.first_name);
          setUserAvatar(data.avatar);
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  // Remove the https:// from the avatar URL if it exists
  const cleanedUserAvatar = userAvatar
    ? userAvatar.replace(/^https?:\/\//, '')
    : '';

  const apiKey = import.meta.env.MEDIA_URL;
  const avatarUrl = `${apiKey}/${cleanedUserAvatar}`;

  return (
    <div>
      <Link to="/profile" className="profile-btn">
        <span>{t('settings:profile.profile')}</span>
        {/* {userAvatar ? (
          <img src={avatarUrl} alt={`Profile picture of ${userFirstName}`} />
        ) : ( */}
        <Icon src="/icons/user-profile.svg" alt="User profile icon" />
        {/* )} */}
      </Link>
    </div>
  );
};

export default ProfileButton;
