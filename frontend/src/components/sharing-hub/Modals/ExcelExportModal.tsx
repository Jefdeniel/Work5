import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarContext } from '../../../store/CalendarContext';
import Modal from '../../ui/Modals/Modal';
import CalendarExportSelector from '../Selectors/CalendarExportSelector';

interface Props {
  onClose: () => void;
}

const ExcelExportModal = ({ onClose }: Props) => {
  const { t } = useTranslation(['calendar']);
  const { calendars } = useContext(CalendarContext);

  return (
    <Modal
      show={true}
      onClose={onClose}
      title={t('calendar:sharing-hub.exportExcel')}
      size="lg"
    >
      <CalendarExportSelector exportOptions={calendars} />
    </Modal>
  );
};

export default ExcelExportModal;
