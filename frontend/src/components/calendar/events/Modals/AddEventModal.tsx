import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';
import { toast } from 'react-toastify';
import { Event } from '../../../../@types/Events';
import useFetch from '../../../../hooks/useFetch';
import Validators from '../../../../utils/Validators';
import Button from '../../../ui/Button/Button';
import LoadingScreen from '../../../ui/Loading/LoadingScreen';
import Modal from '../../../ui/Modals/Modal';
import Input from '../../../ui/Input/Input';
import EventTimeSelector from '../Selectors/EventTimeSelector';
import './EventModal.scss';

interface Props {
  onClose: () => void;
  // setEvent: (event: Event) => void;
}

const AddEventModal = ({ onClose }: Props) => {
  const { t } = useTranslation(['events']);
  const { fetchData: addEvent, loading: isLoading } = useFetch('POST', [
    'events',
  ]);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const onHandleStartTime = (start: string) => {
    setStartTime(start);
  };

  const onHandleEndTime = (end: string) => {
    setEndTime(end);
  };

  const handleAddEvent = async (values: Event) => {
    try {
      const response = await addEvent(
        {},
        { ...values, start_time: startTime, end_time: endTime }
      );

      if (response.ok) {
        console.log('New event:', values);
        toast.success(t('events:toasts.addSuccess'));
        if (onClose) {
          onClose();
        }
      } else {
        toast.error(t('events:toasts.addError'));
        throw new Error('Failed to save event: ' + response.statusText);
      }
    } catch (error) {
      toast.error(t('events:toasts.addError') + ': ' + error.message);
      console.error('Error adding event:', error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Modal
      show={true}
      onClose={onClose}
      title={t('events:modals.add.title')}
      size="sm"
    >
      <Form
        onSubmit={handleAddEvent}
        render={({ handleSubmit }) => (
          <form className={`event-form`} onSubmit={handleSubmit}>
            <Field name="title" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('events:eventInfo.input')}
                  isBig
                />
              )}
            </Field>

            <Field name="description" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('events:eventInfo.description')}
                  isBig
                />
              )}
            </Field>

            <div className={`time-selectors`}>
              <EventTimeSelector
                onChange={onHandleStartTime}
                value={startTime}
              />

              <span>-</span>

              <EventTimeSelector onChange={onHandleEndTime} value={endTime} />
            </div>

            <span className="my-3">Label choice select</span>

            <div className="d-flex justify-content-end">
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

export default AddEventModal;
