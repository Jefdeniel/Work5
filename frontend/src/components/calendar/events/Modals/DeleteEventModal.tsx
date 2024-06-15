import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Event } from '../../../../@types/Events';

import useFetch from '../../../../hooks/useFetch';
import Button from '../../../ui/Button/Button';

import './EventModal.scss';

interface Props {
  onClose: () => void;
  event: Event;
  onRemoveEvent: (eventId: number) => void;
}

const DeleteEventModal = ({ onClose, event, onRemoveEvent }: Props) => {
  const { t } = useTranslation(['events']);

  const { fetchData: deleteEvent, loading: isLoading } = useFetch('DELETE', [
    'events',
    event.id?.toString() ?? '',
  ]);

  // TODO: Add translations
  const handleDeleteEvent = async () => {
    await deleteEvent({}, { id: event.id }).then((response) => {
      if (response.ok) {
        toast.success(t('events:toasts.deleted'));
        if (event.id) {
          onRemoveEvent(event.id!);
        }
      } else {
        console.error(response);
        toast.error(t('events:errors.deleted'));
      }
      onClose();
    });
  };

  return (
    <Modal show={true} size="sm" onHide={onClose}>
      <Modal.Header className="p-3" closeButton>
        <Modal.Title>{t('events:modals.delete.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-3 pb-4">
        <p>{t('events:modals.delete.description')}</p>

        <div className="d-flex justify-content-center">
          <Button onClick={handleDeleteEvent} className="btn--danger">
            {t('events:modals.delete.confirm')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteEventModal;
