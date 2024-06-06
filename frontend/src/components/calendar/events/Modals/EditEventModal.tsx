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
// import EventRepeatSelector from '../Selectors/EventRepeatSelector';
import Input from '../../../ui/Input/Input';
import EventTimeSelector from '../Selectors/EventTimeSelector';

import './EventModal.scss';

interface Props {
  // event: Event;
  onClose: () => void;
  // setEvent: (event: Event) => void;
}

const EditEventModal = ({ onClose }: Props) => {
  const { t } = useTranslation(['events']);
  const { fetchData: addEvent, loading: isLoading } = useFetch('POST', [
    'events',
  ]);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  // Handle the start time change
  const onHandleStartTime = (start: string) => {
    setStartTime(start);
  };

  // Handle the end time change
  const onHandleEndTime = (end: string) => {
    setEndTime(end);
  };

  const handleUpdateEvent = async (values: Event) => {
    try {
      const response = await addEvent(
        {},
        {
          ...values,
          title: values.title,
          description: values.description,
          start_time: startTime,
          end_time: endTime,
        }
      );

      if (response.ok) {
        console.log('Updated event:', values); // Debugging
        toast.success(t('events:toasts.updateSuccess'));
        onClose(); // Close the modal after successful submission
      } else {
        toast.error(t('events:toasts.updateError'));
        throw new Error('Failed to update event: ' + response.statusText);
      }
    } catch (error) {
      toast.error(t('events:toasts.updateError') + ': ' + error.message);
      console.error('Error updating event:', error); // Debugging
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Modal
      show={true}
      onClose={onClose}
      title={t('events:modals.edit.title')}
      size="sm"
    >
      <Form
        onSubmit={handleUpdateEvent}
        render={({ handleSubmit }) => (
          <form className={`event-form`} onSubmit={handleSubmit}>
            <Field name="title" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('events:eventInfo.title')}
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

            {/* <Field name="repeat">
              {({ input, meta }) => (
                <EventRepeatSelector
                  {...input}
                  meta={meta}
                  onChange={input.onChange}
                />
              )}
            </Field> */}

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

export default EditEventModal;
