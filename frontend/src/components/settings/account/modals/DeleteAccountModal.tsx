import Modal from '../../../ui/Modals/Modal';

interface Props {
  onClose: () => void;
}

const DeleteAccountModal = ({ onClose }: Props) => {
  const handleLogout = () => {
    // Logout user
  };
  return (
    <Modal
      show={true}
      isDanger={true}
      title="delete account"
      subtitle="are you sure you want to delete your account?"
      onClose={onClose}
    >
      <button onClick={handleLogout}>delete</button>
    </Modal>
  );
};

export default DeleteAccountModal;
