import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';

import Modal from '../../../ui/Modals/Modal';
import Button from '../../../ui/Button/Button';

import './Modal.scss';

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
          <form onSubmit={handleSubmit} className={`d-flex flex-column gap-3`}>
            <div
              className={`d-flex justify-content-between align-items-center`}
            >
              <label>
                <span className={`time-input-label`}>
                  {t('calendar:calendar-customize.time-blocking.start-time')}
                </span>

                <Field
                  className={`time-input`}
                  name="start_time"
                  component="input"
                  type="time"
                />
              </label>

              <span className={`mt-4`}>-</span>

              <label>
                <span className={`time-input-label`}>
                  {t('calendar:calendar-customize.time-blocking.end-time')}
                </span>

                <Field
                  className={`time-input`}
                  name="end_time"
                  component="input"
                  type="time"
                />
              </label>
            </div>

            <Button
              className={`btn--success mt-3 d-flex`}
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
