import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Event } from '../../../../@types/Events';
import useFetch from '../../../../hooks/useFetch';
import Button from '../../../ui/Button/Button';
import Modal from '../../../ui/Modals/Modal';
import './EventModal.scss';
import { toast } from 'react-toastify';

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

  const handleDeleteEvent = async () => {
    await deleteEvent({}, { id: event.id }).then((response) => {
      if (response.ok) {
        if (event.id) {
          onRemoveEvent(event.id!);
        }
      } else {
        console.error(response);
        toast.error(t('events:toasts.error'));
      }
      onClose();
    });
  };

  return (
    <Modal
      show={true}
      onClose={onClose}
      title={t('events:modals.add.title')}
      size="sm"
    >
      <Form
        onSubmit={handleDeleteEvent}
        render={({ handleSubmit }) => (
          <form className={`event-form`} onSubmit={handleSubmit}>
            <div className="d-flex">
              <Button
                className="btn--success mt-3 d-flex"
                isBig
                type="submit"
                disabled={isLoading}
              >
                {t('settings:save')}
              </Button>
            </div>
          </form>
        )}
      />
    </Modal>
  );
};

export default DeleteEventModal;
