import { useTranslation } from 'react-i18next';
import Button from '../../../ui/Button/Button';
import Modal from '../../../ui/Modals/Modal';
import useFetch from '../../../../hooks/useFetch';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
}

const DeleteAccountModal = ({ onClose }: Props) => {
  const { t } = useTranslation(['settings']);
  const navigate = useNavigate();
  const { user_id, logout } = useAuth();
  console.log(user_id);

  const { fetchData: deleteUser } = useFetch('DELETE', ['users', user_id]);

  const handleDeleteAccount = async () => {
    await deleteUser({}, { id: user_id }).then((response) => {
      if (response.ok) {
        toast.success(t('settings:account.accountDeleted'));
        logout();
        navigate('/login');
      } else {
        toast.error(t('settings:account.accountNotDeleted'));
        console.error(response);
      }
      onClose();
    });
  };

  return (
    <Modal
      title={t('settings:account.deleteAccount')}
      message={t('settings:account.deleteAccountDescription')}
      show={true}
      isDanger={true}
      size="lg"
      onClose={onClose}
    >
      <div className="d-flex justify-content-end">
        <Button onClick={handleDeleteAccount} className="btn--danger">
          {t('settings:account.deleteAccount')}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
