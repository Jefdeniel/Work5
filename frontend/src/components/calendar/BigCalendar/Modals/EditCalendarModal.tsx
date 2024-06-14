import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Calendar } from '../../../../@types/Calendar';
import useFetch from '../../../../hooks/useFetch';
import { CalendarContext } from '../../../../store/CalendarContext';

import { PLACEHOLDER_IMG } from '../../../../constants/placeholders';
import useAuth from '../../../../hooks/useAuth';
import Validators from '../../../../utils/Validators';
import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';

interface Props {
  onClose: () => void;
  calendar: Calendar;
  onEditCalendar: (calendarId: number) => void;
}

const EditCalendarModal = ({ onClose, calendar }: Props) => {
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
    date_start: calendar.date_start
      ? new Date(calendar.date_start).toISOString().substring(0, 16)
      : '',
    date_stop: calendar.date_stop
      ? new Date(calendar.date_stop).toISOString().substring(0, 16)
      : '',
  };

  const handleEditCalendar = async (values: Calendar) => {
    try {
      const response = await editCalendar(
        {},
        {
          ...values,
          id: calendar.id,
          owner_id: user_id,
          image: values.image || PLACEHOLDER_IMG,
          date_start: values.date_start
            ? new Date(values.date_start).toISOString()
            : null,
          date_stop: values.date_stop
            ? new Date(values.date_stop).toISOString()
            : null,
        }
      );
      if (response.ok) {
        setCalendars((prevCalendars) =>
          prevCalendars.map((calendarUser) => {
            if (calendarUser.calendar.id === calendar.id) {
              return {
                ...calendarUser,
                calendar: {
                  ...calendarUser.calendar,
                  ...values,
                  image: values.image || PLACEHOLDER_IMG,
                },
              };
            }
            return calendarUser;
          })
        );
        onClose();
        toast.success(t('calendar:toasts:success'));
      }
    } catch (error) {
      console.error(error);
      toast.error(t('calendar:toasts:error'));
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
