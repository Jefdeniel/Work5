import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';

import Modal from '../../../ui/Modals/Modal';
import Button from '../../../ui/Button/Button';

import './Modal.scss';
import Validators from '../../../../utils/Validators';
import Input from '../../../ui/Input/Input';

interface Props {
  onClose: () => void;
  onSubmit: (timeBlock: { start_time: string; end_time: string }) => void;
}

const AddTimeBlockingModal = ({ onClose, onSubmit }: Props) => {
  const { t } = useTranslation(['calendar']);

  return (
    <Modal
      show={true}
      onClose={onClose}
      title={t('calendar:calendar-customize.time-blocking.title')}
      size="sm"
    >
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={`time-block-modal`}>
            <Field name="start_time" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  type="datetime-local"
                  title={t(
                    'calendar:calendar-customize.time-blocking.start-time'
                  )}
                  className={`time-input my-0`}
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
                  className={`time-input my-0`}
                />
              )}
            </Field>

            <Button
              className={`btn--success submit-btn`}
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
