import { useState } from 'react';
import Button from '../components/ui/Button/Button';
import useSetTitle from '../hooks/setTitle';
import { useTranslation } from 'react-i18next';
import AddEventModal from '../components/calendar/events/Modals/AddEventModal';
import { Row } from 'react-bootstrap';
import Heading from '../components/ui/Heading/Heading';

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

  return (
    <>
      <Row>
        <Heading level={1} className="heading--lg clr-primary mb-small">
          {t('calendar:sharing-hub.title')}
        </Heading>
      </Row>

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
