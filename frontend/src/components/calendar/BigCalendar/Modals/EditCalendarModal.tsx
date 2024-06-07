import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useCallback, useContext, useEffect, useState } from 'react';

import { Calendar, CalendarUser } from '../../../../@types/Calendar';
import useFetch from '../../../../hooks/useFetch';
import { CalendarContext } from '../../../../store/CalendarContext';

import Button from '../../../ui/Button/Button';
import useAuth from '../../../../hooks/useAuth';
import { Field, Form } from 'react-final-form';
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
  const calendarContext = useContext(CalendarContext);

  const [initialValues, setInitialValues] = useState<Calendar>({
    title: '',
    description: '',
    date_start: '',
    date_stop: '',
  });

  const { fetchData: editCalendar, loading: isLoading } = useFetch('PUT', [
    'calendars',
    calendar.id?.toString() ?? '',
  ]);

  const fetchCalendarsMemoized = useCallback(editCalendar, []);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetchCalendarsMemoized();
        const data = await response.json();
        setInitialValues({
          id: data.id,
          title: data.title,
          description: data.description,
          owner_id: data.owner_id,
          date_start: data.date_start,
          date_stop: data.date_stop,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchCalendarData();
  }, [fetchCalendarsMemoized]);

  const handleEditCalendar = async (values: Calendar) => {
    try {
      const response = await editCalendar(
        {},
        {
          ...values,
          id: calendar.id,
          title: values.title,
          description: values.description,
          owner_id: user_id,
        }
      );
      if (response.ok) {
        const data = await response.json();
        onEditCalendar(data.id);
        calendarContext.setCalendars((prev: CalendarUser[]) =>
          prev.map((cal) =>
            cal.calendar.id === data.id ? { ...cal, calendar: data } : cal
          )
        );
        onClose();
        toast.success(t('calendar:calendar-overview.edit-success'));
      } else {
        toast.error(t('calendar:calendar-overview.edit-error'));
      }
    } catch (error) {
      console.error(error);
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
