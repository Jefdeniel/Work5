import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { Field, Form } from 'react-final-form';

import { Calendar } from '../../../../@types/Calendar';
import useFetch from '../../../../hooks/useFetch';
import { CalendarContext } from '../../../../store/CalendarContext';

import Button from '../../../ui/Button/Button';
import useAuth from '../../../../hooks/useAuth';
import Validators from '../../../../utils/Validators';
import Input from '../../../ui/Input/Input';

interface Props {
  onClose: () => void;
  calendar: Calendar;
  onEditCalendar: (calendarId: number) => void;
}

const EditCalendarModal = ({ onClose, calendar, onEditCalendar }: Props) => {
  const { t } = useTranslation(['calendar']);
  const { user_id } = useAuth();
  const { setCalendars } = useContext(CalendarContext);

  const { fetchData: editCalendar, loading: isLoading } = useFetch('PUT', [
    'calendars',
    calendar.id?.toString() ?? '',
  ]);

  const initialValues = {
    title: calendar.title || '',
    description: calendar.description || '',
    date_start: calendar.date_start || '',
    date_stop: calendar.date_stop || '',
  };

  const handleEditCalendar = async (values: Calendar) => {
    try {
      const response = await editCalendar(
        {},
        {
          ...values,
          id: calendar.id,
          owner_id: user_id,
        }
      );
      if (response.ok) {
        setCalendars((prevCalendars) =>
          prevCalendars.map((cal) => (cal.id === calendar.id ? values : cal))
        );
        onEditCalendar(calendar.id);
        onClose();
        toast.success(t('calendar:calendar-overview.edit-success'));
      } else {
        toast.error(t('calendar:calendar-overview.edit-error'));
      }
    } catch (error) {
      console.error(error);
      toast.error(t('calendar:calendar-overview.edit-error'));
    }
  };

  return (
    <Modal show={true} size="sm" onHide={onClose}>
      <Modal.Header className="p-3" closeButton>
        <Modal.Title>{t('calendar:calendar-overview.edit-title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-3 pb-4">
        <p>{t('calendar:calendar-overview.edit-description')}</p>

        <Form
          onSubmit={handleEditCalendar}
          initialValues={initialValues}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="title" validate={Validators.required()}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    meta={meta}
                    title={t('calendar:calendar-overview.title')}
                    type="text"
                    placeholder={initialValues.title}
                    isBig
                  />
                )}
              </Field>

              <Field name="description" validate={Validators.maxLength(255)}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    meta={meta}
                    title={t('calendar:calendar-overview.description')}
                    type="text"
                    placeholder={initialValues.description}
                    isBig
                  />
                )}
              </Field>

              <Field name="date_start">
                {({ input, meta }) => (
                  <Input
                    {...input}
                    meta={meta}
                    title={t('calendar:calendar-overview.date-start')}
                    type="datetime-local"
                    placeholder={initialValues.date_start}
                  />
                )}
              </Field>
              <Field name="date_stop">
                {({ input, meta }) => (
                  <Input
                    {...input}
                    meta={meta}
                    title={t('calendar:calendar-overview.date-stop')}
                    type="datetime-local"
                    placeholder={initialValues.date_stop}
                  />
                )}
              </Field>

              <div className="d-flex justify-content-end">
                <Button
                  className="btn--success mt-2"
                  type="submit"
                  disabled={isLoading}
                >
                  {t('settings:save')}
                </Button>
              </div>
            </form>
          )}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditCalendarModal;
