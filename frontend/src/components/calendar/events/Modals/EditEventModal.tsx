import { useMemo, useState } from 'react';
import { Field, Form } from 'react-final-form';

import useFetch from '../../../../hooks/useFetch';

import LoadingScreen from '../../../ui/Loading/LoadingScreen';
import { Event } from '../../../../@types/Events';
import Button from '../../../ui/Button/Button';
import Icon from '../../../ui/Icon/Icon';
import Input from '../../../ui/Input/Input';
import Modal from '../../../ui/Modals/Modal';
import Select from '../../../ui/Select/Select';

interface Props {
  event: Event;
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
      // TODO: No inline function
      onChange={(e) => onChange && onChange(e.target.value)}
      width="100%"
    />
  );
};

const EditEventModal = ({
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
  // TODO: Add translation hook
  const titleLabel = event?.id ? 'Edit event' : 'Create an event';

  //TODO: Let POST work -> ask Jef how to implement with useFetch hook
  //TODO: Give meta + validators with inputs

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

            {/* TODO: Use translation hook */}
            <Select title="Select a theme" options={[]} />

            <Button
              // TODO: Use translation hook
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

export default EditEventModal;
