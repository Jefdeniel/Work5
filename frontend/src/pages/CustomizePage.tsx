import { useState } from 'react';
import Button from '../components/ui/Button/Button';
import useSetTitle from '../hooks/setTitle';
import { useTranslation } from 'react-i18next';
import AddEventModal from '../components/calendar/events/Modals/AddEventModal';

const CustomizePage = () => {
  useSetTitle('Customize');
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation(['general', 'customize']);
  // Modals
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // const addEventToList = (event: any) => {
  //   console.log('Event:', event);
  // };

  return (
    <>
      <Button
        text={t('general:buttons.add')}
        onClick={openModal}
        style={{ height: '40px', marginLeft: '25px' }}
        icon={<img src="/icons/user-plus.svg" alt="add" />}
      />
      {showModal && <AddEventModal onClose={closeModal} />}
    </>
  );
};

export default CustomizePage;
