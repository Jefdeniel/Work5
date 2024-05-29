import { Spinner } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Event } from '../../../../@types/Events';
import useFetch from '../../../../hooks/useFetch';
import Validators from '../../../../utils/Validators';

import Button from '../../../ui/Button/Button';
import LoadingScreen from '../../../ui/Loading/LoadingScreen';
import Modal from '../../../ui/Modals/Modal';
import EventDescriptionSelector from '../Selectors/EventDescriptionSelector';
import EventTitleSelector from '../Selectors/EventTitleSelector copy';
import EventRepeatSelector from '../Selectors/EventRepeatSelector';

interface Props {
  onClose: () => void;
  setEvent: (event: Event) => void;
}

const AddEventModal = ({ onClose, setEvent }: Props) => {
  const { t } = useTranslation(['events']);
  const { fetchData: addEvent, loading: isLoading } = useFetch('POST', [
    'events',
  ]);

  const handleAddEvent = async (values: Event) => {
    try {
      const response = await addEvent(
        {},
        {
          ...values,
          title: values.title,
          description: values.description,
        }
      );

      if (response.ok) {
        console.log('New event:', values); // Debugging
        toast.success(t('events:toasts.addSuccess'));
        onClose(); // Close the modal after successful submission
      } else {
        toast.error(t('events:toasts.addError'));
        throw new Error('Failed to save event: ' + response.statusText);
      }
    } catch (error) {
      toast.error(t('events:toasts.addError') + ': ' + error.message);
      console.error('Error adding event:', error); // Debugging
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
      size="lg"
    >
      <Form
        onSubmit={handleAddEvent}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="title"
              validate={Validators.compose(
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)
              )}
            >
              {({ input, meta }) => (
                <EventTitleSelector
                  {...input}
                  meta={meta}
                  onChange={input.onChange}
                />
              )}
            </Field>
            <Field
              name="description"
              validate={Validators.compose(
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)
              )}
            >
              {({ input, meta }) => (
                <EventDescriptionSelector
                  {...input}
                  meta={meta}
                  onChange={input.onChange}
                />
              )}
            </Field>
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
                className="btn--success mt-3"
                text={isLoading ? <Spinner /> : t('events:buttons.add')}
                type="submit" // why the fuck wont it submit
                disabled={isLoading}
              />
            </div>
          </form>
        )}
      />
    </Modal>
  );
};

export default AddEventModal;
