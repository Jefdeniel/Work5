import { useMemo, useState } from 'react';
import { Field, Form } from 'react-final-form';

import useFetch from '../../../hooks/useFetch';

import LoadingScreen from '../Loading/LoadingScreen';
import { CalendarEvent } from '../../../@types/CalendarEvents';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import Modal from '../Modals/Modal';
import Select from '../Select/Select';

interface Props {
  event: CalendarEvent;
  showEvent: boolean;
  titleValue?: string;
  descriptionValue?: string;
  onClose: () => void;
}

// Custom time input for the event modal
const customTimeInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (val: string) => void;
}) => {
  return (
    <Input
      defaultValue={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      width="100%"
    />
  );
};

const EventModal = ({
  event,
  showEvent,
  titleValue,
  descriptionValue,
  onClose,
}: Props) => {
  // CRUD requests to backend
  const [error, setError] = useState<string | null>(null);
  const { fetchData: postEvent, loading: isLoading } = useFetch('POST', [
    'events',
  ]);
  // const { fetchData: putEvent, loading: isLoading } = useFetch('PUT', ['events', event.id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Initial values for the form
  const initialValues = useMemo(() => ({ ...event }), [event]);

  // Title of the modal
  const titleLabel = event?.id ? 'Edit event' : 'Create an event';

  //TODO: Let POST work -> ask Jef how to implement with useFetch hook

  return (
    <Modal show={showEvent} onClose={onClose} title={titleLabel} size="sm">
      <Form
        onSubmit={async (values) => {
          if (!event.id) postEvent(values);
          // else putEvent(values);
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
              <span>BTN</span>

              <span>-</span>

              <span>BTN</span>
            </div>

            <div>
              <div></div>

              <Select title="Select a theme" options={[]} />
            </div>

            {error && <div className="error-message">{error}</div>}

            <Button
              className={`btn--success mt-3`}
              text={isLoading ? 'Creating...' : 'Create'}
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
