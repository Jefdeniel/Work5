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
import EventTimeSelector from '../Selectors/EndEventTimeSelector';

import './EventModal.scss';
import EventRepeatSelector from '../Selectors/EventRepeatSelector';

interface Props {
  event?: Event;
  onClose: () => void;
  // setEvent: (event: Event) => void;
}

const EditEventModal = ({ onClose }: Props) => {
  const { t } = useTranslation(['events']);
  const { fetchData: addEvent, loading: isLoading } = useFetch('PUT', [
    'events',
  ]);

  const handleUpdateEvent = async (values: Event) => {
    try {
      const response = await addEvent(
        {},
        {
          ...values,
          title: values.title,
          description: values.description,
          start_time: values.start,
          end_time: values.end,
        }
      );

      if (response.ok) {
        console.log('Updated event:', values);
        toast.success(t('events:toasts.updateSuccess'));
        onClose();
      } else {
        toast.error(t('events:toasts.updateError'));
        throw new Error('Failed to update event: ' + response.statusText);
      }
    } catch (error) {
      toast.error(t('events:toasts.updateError') + ': ' + error.message);
      console.error('Error updating event:', error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const onHandleStartTime = (startTime: string) => {
    console.log('Start time:', startTime);
  };

  const onHandleEndTime = (endTime: string) => {
    console.log('End time:', endTime);
  };

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
            <Field name="title" validate={Validators.maxLength('50')}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('events:eventInfo.title')}
                  isBig
                  value={input.values.title}
                />
              )}
            </Field>

            <Field name="description" validate={Validators.maxLength('100')}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('events:eventInfo.description')}
                  isBig
                  value={input.description}
                />
              )}
            </Field>

            <div className={`time-selectors`}>
              <EventTimeSelector
                onChange={onHandleStartTime}
                // value={start_time}
              />

              <span>-</span>

              <EventTimeSelector
                onChange={onHandleEndTime} /*value={end_time}*/
              />
            </div>

            <span className="my-3">Label choice select</span>

            <Field name="repeat">
              {({ input, meta }) => (
                <EventRepeatSelector
                  {...input}
                  meta={meta}
                  onChange={input.onChange}
                />
              )}
            </Field>

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
