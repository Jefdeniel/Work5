import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Calendar } from '../../../../@types/Calendar';
import useFetch from '../../../../hooks/useFetch';
import Button from '../../../ui/Button/Button';
import { useContext } from 'react';
import { CalendarContext } from '../../../../store/CalendarContext';

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
  const { t } = useTranslation(['calendars']);
  const calendarContext = useContext(CalendarContext);

  const { fetchData: deleteCalendar } = useFetch('DELETE', [
    'calendars',
    calendar.id?.toString() ?? '',
  ]);

  const handleDeleteCalendar = async () => {
    await deleteCalendar({}, { id: calendar.id }).then((response) => {
      if (response.ok) {
        toast.success(t('settings:account.accountDeleted'));
        if (calendar.id) {
          onRemoveCalendar(calendar.id);
          calendarContext.setCalendars((prev) =>
            prev.filter(
              (cal: { id: number | undefined }) => cal.id !== calendar.id
            )
          );
        }
      } else {
        toast.error(t('settings:account.accountNotDeleted'));
        console.error(response);
      }
      onClose();
    });
  };

  return (
    <Modal
      title={t('settings:account.deleteAccount')}
      message={t('settings:account.deleteAccountDescription')}
      show={true}
      isDanger={true}
      size="lg"
      onClose={onClose}
    >
      <div className="d-flex justify-content-end">
        <Button onClick={handleDeleteCalendar} className="btn--danger">
          {t('settings:account.deleteAccount')}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteCalendarModal;
