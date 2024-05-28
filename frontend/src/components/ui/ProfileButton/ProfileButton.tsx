import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './ProfileButton.scss';
import Icon from '../Icon/Icon';

interface Props {
  userFirstName?: string;
  userAvatar?: string;
}

const ProfileButton = ({ userAvatar, userFirstName }: Props) => {
  const { t } = useTranslation(['settings']);

  return (
    <div>
      <Link to="/profile" className={`profile-btn`}>
        <span>{t('settings:profile.profile')}</span>

        {userAvatar ? (
          <img src={userAvatar} alt={`Profile picture of ${userFirstName}`} />
        ) : (
          <Icon src="/icons/user-profile.svg" alt="User profile icon" />
        )}
      </Link>
    </div>
  );
};

export default ProfileButton;
