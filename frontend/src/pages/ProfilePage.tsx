import { useState } from 'react';
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

const ProfilePage = () => {
  const { t } = useTranslation(['settings']);
  useSetTitle(t('settings:profile.title'));

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  // modals
  const openDeleteAccountModal = () => {
    setShowDeleteAccountModal(true);
  };

  const closeDeleteAccountModal = () => {
    setShowDeleteAccountModal(false);
  };

  return (
    <>
      <ProfilePageHeader />

      <Row className="mb-base mt-large">
        <Heading level={3}>{t('settings:profile.changeOptions')}</Heading>
        <ActionButtonList
          items={CHANGE_OPTIONS_ITEMS}
          className="btn--primary"
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
    </>
  );
};

export default ProfilePage;
