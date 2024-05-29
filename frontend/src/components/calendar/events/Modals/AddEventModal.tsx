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
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
  setEvent: (event: Event) => void;
}

const AddEventModal = ({ onClose, setEvent }: Props) => {
  const t = useTranslation(['calendar']);
  const { fetchData: addEvent, loading: isLoading } = useFetch('POST', [
    'events',
  ]);

  const handleAddEvent = async (event: Event) => {
    await addEvent(
      {},
      {
        title: event.title,
        // add more
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          toast.error('Error adding event');
        }
      })
      .then((event) => {
        if (event) {
          setEvent(event);
        }
      });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

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

              {/* TODO: Use translation hook */}
              <Select title="Select a theme" options={[]} />
            </div>

            {error && <div className="error-message">{error}</div>}

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

export default AddEventModal;
