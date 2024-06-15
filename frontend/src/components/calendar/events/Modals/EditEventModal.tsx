import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Event } from '../../../../@types/Events';
import useFetch from '../../../../hooks/useFetch';
import Validators from '../../../../utils/Validators';

import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';
import LoadingScreen from '../../../ui/Loading/LoadingScreen';
import Modal from '../../../ui/Modals/Modal';

import EndEventTimeSelector from '../Selectors/EndEventTimeSelector';
import EventRepeatSelector from '../Selectors/EventRepeatSelector';
import StartEventTimeSelector from '../Selectors/StartEventTimeSelector';
import './EventModal.scss';

interface Props {
  event?: Event;
  onClose: () => void;
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
          start_time: values.start_time,
          end_time: values.end_time,
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
                  value={input.values.title ? input.values.title : ''}
                />
              )}
            </Field>

            <Field name="start_time" validate={Validators.required()}>
              {({ input, meta }) => (
                <StartEventTimeSelector
                  {...input}
                  meta={meta}
                  value={input.values.start_time ? input.values.start_time : ''}
                />
              )}
            </Field>

            <Field name="end_time" validate={Validators.required()}>
              {({ input, meta }) => (
                <EndEventTimeSelector
                  {...input}
                  meta={meta}
                  value={input.values.end_time ? input.values.end_time : ''}
                />
              )}
            </Field>

            <Field name="description" validate={Validators.maxLength('100')}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('events:eventInfo.description')}
                  value={input.description ? input.description : ''}
                />
              )}
            </Field>

            <Field name="repeat">
              {({ input, meta }) => (
                <EventRepeatSelector
                  {...input}
                  meta={meta}
                  value={input.values.repeat ? input.values.repeat : ''}
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
