// ProfilePage.tsx
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DeleteAccount from '../components/settings/account/DeleteAccount';
import Signout from '../components/settings/account/Signout';
import DeleteAccountModal from '../components/settings/account/modals/DeleteAccountModal';
import ProfilePageHeader from '../components/settings/account/profile/ProfilePageHeader';
import Heading from '../components/ui/Heading/Heading';
import ActionButtonList from '../components/ui/List/ActionButtonList';
import { CHANGE_OPTIONS_ITEMS, CONNECT_ITEMS } from '../constants/profile';
import useSetTitle from '../hooks/setTitle';
import EditEmailModal from '../components/settings/account/modals/EditEmailModal';
import EditPasswordModal from '../components/settings/account/modals/EditPasswordModal';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation(['settings']);
  useSetTitle(t('settings:profile.title'));

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showEditEmailModal, setShowEditEmailModal] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);

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
    <>
      <ProfilePageHeader />

      <Row className="mb-base mt-large">
        <Heading level={3}>{t('settings:profile.changeOptions')}</Heading>
        <ActionButtonList
          items={CHANGE_OPTIONS_ITEMS}
          className="btn--primary"
          functionMap={functionMap}
        />
      </Row>

      <Row className="mb-base mt-large">
        <Heading level={3}>{t('settings:profile.calendars')}</Heading>
      </Row>

      <Row className="mb-base mt-large">
        <Heading level={3}>{t('settings:profile.connectAccounts')}</Heading>
        <ActionButtonList
          items={CONNECT_ITEMS}
          className="btn--bordered-primary"
          functionMap={functionMap}
        />
      </Row>

      <Row className="mb-base mt-large">
        <Heading level={3}>{t('settings:account.title')}</Heading>
        <Signout className={`btn btn--danger`} />

        <DeleteAccount
          className={`btn btn--bordered-danger`}
          onClick={openDeleteAccountModal}
        />
      </Row>

      {showDeleteAccountModal && (
        <DeleteAccountModal onClose={closeDeleteAccountModal} />
      )}

      {showEditEmailModal && <EditEmailModal onClose={closeEditEmailModal} />}

      {showEditPasswordModal && (
        <EditPasswordModal onClose={closeEditPasswordModal} />
      )}
    </>
  );
};

export default ProfilePage;
