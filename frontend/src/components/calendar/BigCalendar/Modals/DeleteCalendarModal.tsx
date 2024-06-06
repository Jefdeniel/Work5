import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useContext } from 'react';

import { Calendar } from '../../../../@types/Calendar';
import useFetch from '../../../../hooks/useFetch';
import { CalendarContext } from '../../../../store/CalendarContext';

import Button from '../../../ui/Button/Button';

interface Props {
  onClose: () => void;
  calendar: Calendar;
  onRemoveCalendar: (calendarId: number) => void;
}

const DeleteCalendarModal = ({
  onClose,
  calendar,
  onRemoveCalendar,
}: Props) => {
  const { t } = useTranslation(['calendar']);
  const calendarContext = useContext(CalendarContext);

  const { fetchData: deleteCalendar } = useFetch('DELETE', [
    'calendars',
    calendar.id?.toString() ?? '',
  ]);

  const handleDeleteCalendar = async () => {
    await deleteCalendar({}, { id: calendar.id }).then((response) => {
      if (response.ok) {
        toast.success(t('calendar:calendar-overview.toast.calendar-deleted'));
        if (calendar.id) {
          onRemoveCalendar(calendar.id);
          calendarContext.setCalendars((prev) =>
            prev.filter(
              (cal: { id: number | undefined }) => cal.id !== calendar.id
            )
          );
        }
      } else {
        toast.error(
          t('calendar:calendar-overview.toast.calendar-deletion-failed')
        );
        console.error(response);
      }
      onClose();
    });
  };

  return (
    <Modal show={true} size="sm" onHide={onClose}>
      <Modal.Header className={`p-3`} closeButton>
        <Modal.Title>
          {t('calendar:calendar-overview.delete-title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={`p-3 pb-4`}>
        <p>{t('calendar:calendar-overview.delete-description')}</p>

        <div className="d-flex justify-content-center">
          <Button onClick={handleDeleteCalendar} className="btn--danger">
            {t('calendar:calendar-overview.delete-confirmation-yes')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCalendarModal;
