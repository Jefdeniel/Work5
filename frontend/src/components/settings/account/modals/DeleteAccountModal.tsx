import { useTranslation } from 'react-i18next';
import Button from '../../../ui/Button/Button';
import Modal from '../../../ui/Modals/Modal';
import { Row } from 'react-bootstrap';

interface Props {
  onClose: () => void;
}

const DeleteAccountModal = ({ onClose }: Props) => {
  const { t } = useTranslation(['settings']);
  const handleLogout = () => {
    // Logout user
  };
  return (
    <Modal
      title={t('settings:account.deleteAccount')}
      message={t('settings:account.deleteAccountDescription')}
      show={true}
      isDanger={true}
      onClose={onClose}
    >
      <Row justifyContent="end">
        <Button onClick={handleLogout} isOutline={true}>
          {t('settings:account.deleteAccount')}
        </Button>
      </Row>
    </Modal>
  );
};

export default DeleteAccountModal;
