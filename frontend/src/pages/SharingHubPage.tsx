import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Calendar } from '../@types/Calendar';
import ExcelExportModal from '../components/sharing-hub/Modals/ExcelExportModal';
import Heading from '../components/ui/Heading/Heading';
import ActionButtonList from '../components/ui/List/ActionButtonList';
import {
  EXPORT_AGENDA_ITEMS,
  EXTERNAL_SERVICES_ITEMS,
} from '../constants/sharing-hub';
import useSetTitle from '../hooks/setTitle';

const SharingHubPage = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar:sharing-hub.title'));

  // State
  const [showExcelModal, setShowExcelModal] = useState(false);
  const calendar: Calendar = {};

  // Modal handlers
  const openExcelModal = () => setShowExcelModal(true);
  const closeExcelModal = () => setShowExcelModal(false);

  // Function map
  const functionMap: Record<string, () => void> = {
    exportAsPDF: () => {},
    openExcelModal,
    handleSlackClick: () => {},
    handleGoogleCalendarClick: () => {},
    handleOutlookClick: () => {},
  };

  return (
    <>
      <Row>
        <Heading level={1} className="heading--lg clr-primary mb-small">
          {t('calendar:sharing-hub.title')}
        </Heading>
        <p className="mb-large">{t('calendar:sharing-hub.description')}</p>
      </Row>
      <Row className={`mb-large`}>
        <Heading level={3}>
          <p>{t('calendar:sharing-hub.exportAgendaAs')}</p>
        </Heading>
        <ActionButtonList
          items={EXPORT_AGENDA_ITEMS}
          functionMap={functionMap}
          className="btn--primary"
        />
      </Row>
      {/* TODO: Add users in agenda */}
      {/* <Row className={`mb-large`}>
        <Heading level={3}>
          <p>{t('calendar:sharing-hub.usersInAgenda')}</p>
        </Heading>
      </Row> */}
      <Row>
        <Heading level={3}>
          <p>{t('calendar:sharing-hub.integrateExternal')}</p>
        </Heading>
        <ActionButtonList
          items={EXTERNAL_SERVICES_ITEMS}
          functionMap={functionMap}
          className="btn--primary"
        />
      </Row>
      {showExcelModal && (
        <ExcelExportModal onClose={closeExcelModal} calendar={calendar} />
      )}
    </>
  );
};

export default SharingHubPage;
