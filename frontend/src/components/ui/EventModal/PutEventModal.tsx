import { useMemo } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useFetch from '../../../hooks/useFetch';
import { CalendarEvent } from '../../../@types/CalendarEvents';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import Modal from '../Modals/Modal';
import Select from '../Select/Select';
import TimeStartSelector from '../../calendar/general/TimeStartSelector';
import TimeEndSelector from '../../calendar/general/TimeEndSelector';

interface Props {
  event: CalendarEvent;
  showEvent: boolean;
  titleValue?: string;
  descriptionValue?: string;
  onClose: () => void;
}

const EventModal = ({
  event,
  showEvent,
  titleValue,
  descriptionValue,
  onClose,
}: Props) => {
  const { t } = useTranslation(['calendar']);

  const { fetchData: putEvent, loading: isLoading } = useFetch('PUT', [
    'events',
    event.id,
  ]);
  console.log('Event:', event);

  const handleEditEvent = async (values: CalendarEvent) => {
    try {
      const response = await putEvent({}, values);
      // TODO: Put everything that needs to be edited in the event
      // TODO: Add translations
      if (response.ok) {
        onClose();
        toast.success('Event succesfully edited');
      } else {
        toast.error('Failed to edit event');
        throw new Error('Failed to edit event' + response.statusText);
      }
    } catch (error) {
      toast.error('Failed to edit event');
      console.error(error);
    }
  };

  // Initial values for the form
  const initialValues = useMemo(() => ({ ...event }), [event]);

  // Title of the modal
  const titleLabel = event?.id
    ? t('calendar:calendar.editEvent')
    : t('calendar:calendar.createEvent');

  //TODO: Let PUT request work
  //TODO: Give meta + validators with inputs

  return (
    <Modal show={showEvent} onClose={onClose} title={titleLabel} size="sm">
      <Form
        onSubmit={async (values) => {
          putEvent(values);
        }}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="title" component="input">
              {({ input }) => (
                <Input
                  {...input}
                  title="Event title"
                  defaultValue={titleValue}
                />
              )}
            </Field>

            <Field name="Description" component="input">
              {({ input }) => (
                <Input
                  {...input}
                  title="Description"
                  defaultValue={descriptionValue}
                />
              )}
            </Field>

            <div className={`d-flex align-items-center gap-3`}>
              <TimeStartSelector />

              <span>-</span>

              <TimeEndSelector />
            </div>

            <div>
              <Select title={t('calendar:calendar.selectTheme')} options={[]} />
            </div>

            <Button
              className={`btn--success mt-3`}
              text={
                isLoading
                  ? t('calendar:calendar.editing')
                  : t('calendar:calendar.editEvent')
              }
              icon={<Icon src="/icons/plus-bright.svg" alt="Plus icon" />}
              disabled={isLoading}
            />
          </form>
        )}
      />
    </Modal>
  );
};

export default EventModal;
