import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TimeBlock } from '../../../@types/TimeBlock';
import useFetch from '../../../hooks/useFetch';
import Validators from '../../../utils/Validators';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import Modal from '../../ui/Modals/Modal';

import './Modal.scss';

interface Props {
  onClose: () => void;
  setTimeBlock: (timeBlock: TimeBlock) => void;
}

const AddTimeBlockingModal = ({ onClose, setTimeBlock }: Props) => {
  const { t } = useTranslation(['calendar']);
  const params = useParams<{ id: string }>();

  const { fetchData: addTimeBlock } = useFetch('POST', ['timeblocks']);

  const handleAddTimeBlock = async (timeBlock: TimeBlock) => {
    const response = await addTimeBlock(
      {},
      {
        calendar: params.id,
        title: timeBlock.title,
        start_time: timeBlock.start_time
          ? new Date(timeBlock.start_time).toISOString()
          : null,
        end_time: timeBlock.end_time
          ? new Date(timeBlock.end_time).toISOString()
          : null,
      }
    );

    if (response.ok) {
      const newTimeBlock = await response.json();
      setTimeBlock(newTimeBlock);
      toast.success(t('calendar:toasts.success'));
      onClose();
    } else {
      toast.error(t('calendar:toasts.error'));
    }
  };

  return (
    <Modal
      show={true}
      onClose={onClose}
      title={t('calendar:calendar-customize.time-blocking.title')}
      size="sm"
    >
      <Form
        onSubmit={handleAddTimeBlock}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="time-block-modal">
            <Field name="title" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={'Title of time block'}
                  className="heading--sm clr-primary-400"
                />
              )}
            </Field>

            <Field name="start_time" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  type="datetime-local"
                  title={t(
                    'calendar:calendar-customize.time-blocking.start-time'
                  )}
                />
              )}
            </Field>

            <Field name="end_time" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  type="datetime-local"
                  title={t(
                    'calendar:calendar-customize.time-blocking.end-time'
                  )}
                />
              )}
            </Field>

            <Button
              className="btn--success submit-btn"
              isSmall
              type="submit"
              text={t('calendar:calendar-customize.time-blocking.title')}
            />
          </form>
        )}
      />
    </Modal>
  );
};

export default AddTimeBlockingModal;
