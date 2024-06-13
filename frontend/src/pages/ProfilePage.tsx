import { useCallback, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { UserData } from '../@types/UserData';
import CalendarCardList from '../components/calendar/CalendarCard/CalendarCardList';
import DeleteAccount from '../components/settings/account/DeleteAccount';
import DeleteAccountModal from '../components/settings/account/modals/DeleteAccountModal';
import EditEmailModal from '../components/settings/account/modals/EditEmailModal';
import EditPasswordModal from '../components/settings/account/modals/EditPasswordModal';
import ProfilePageHeader from '../components/settings/account/profile/ProfilePageHeader';
import Signout from '../components/settings/account/Signout';
import Heading from '../components/ui/Heading/Heading';
import ActionButtonList from '../components/ui/List/ActionButtonList';
import { CHANGE_OPTIONS_ITEMS, CONNECT_ITEMS } from '../constants/profile';
import useSetTitle from '../hooks/setTitle';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

const ProfilePage = () => {
  const { t } = useTranslation(['settings']);
  useSetTitle(t('settings:profile.title'));
  const { user_id } = useAuth();

  // State
  const [user, setUser] = useState<UserData | null>(null);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showEditEmailModal, setShowEditEmailModal] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);

  const { fetchData: getUserData } = useFetch('GET', [
    'users',
    user_id?.toString() || '',
  ]);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await getUserData();
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  }, [getUserData]);

  useEffect(() => {
    fetchUserData();
  }, []);

  // Modal handlers
  const openDeleteAccountModal = () => setShowDeleteAccountModal(true);
  const closeDeleteAccountModal = () => setShowDeleteAccountModal(false);

  const openEditEmailModal = () => setShowEditEmailModal(true);
  const closeEditEmailModal = () => setShowEditEmailModal(false);

  const openEditPasswordModal = () => setShowEditPasswordModal(true);
  const closeEditPasswordModal = () => setShowEditPasswordModal(false);

  // Function map
  const functionMap: Record<string, () => void> = {
    openEditEmailModal,
    openEditPasswordModal,
    handleSlackClick: () => {},
    handleGoogleCalendarClick: () => {},
    handleOutlookClick: () => {},
    handleAppleCalendarClick: () => {},
  };

  return (
    <div>
      <ProfilePageHeader user={user} />

      <Row className="mb-base mt-large">
        <Heading className={`mb-3`} level={3}>
          {t('settings:profile.changeOptions')}
        </Heading>
        <ActionButtonList
          items={CHANGE_OPTIONS_ITEMS}
          functionMap={functionMap}
          className="btn--primary"
        />
      </Row>

      <Row className="mb-base mt-large">
        <Heading className={`mb-3`} level={3}>
          {t('settings:profile.calendars')}
        </Heading>
        <CalendarCardList layout="column" />
      </Row>

      <Row className="mb-base mt-large">
        <Heading className={`mb-3`} level={3}>
          {t('settings:profile.connectAccounts')}
        </Heading>

        <ActionButtonList
          items={CONNECT_ITEMS}
          functionMap={functionMap}
          className="btn--bordered-primary"
        />
      </Row>

      <Row className="mb-base mt-large">
        <Heading className={`mb-3`} level={3}>
          {t('settings:account.title')}
        </Heading>

        <Signout className={`btn btn--danger`} />

        <DeleteAccount
          className={`btn btn--bordered-danger`}
          onClick={openDeleteAccountModal}
        />
      </Row>

      {showDeleteAccountModal && (
        <DeleteAccountModal onClose={closeDeleteAccountModal} />
      )}

      {showEditEmailModal && (
        <EditEmailModal
          onClose={closeEditEmailModal}
          user={user}
          setUser={setUser}
        />
      )}

      {showEditPasswordModal && (
        <EditPasswordModal onClose={closeEditPasswordModal} />
      )}
    </div>
  );
};

export default ProfilePage;
