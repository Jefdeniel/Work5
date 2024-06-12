import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Calendar } from '../@types/Calendar';

import ExcelExportModal from '../components/sharing-hub/Modals/ExcelExportModal';
import Heading from '../components/ui/Heading/Heading';
import ActionButtonList from '../components/ui/List/ActionButtonList';
import {
  EXPORT_AGENDA_ITEMS,
  EXTERNAL_SERVICES_ITEMS,
} from '../constants/sharing-hub';
import useSetTitle from '../hooks/setTitle';
import Button from '../components/ui/Button/Button';
import Icon from '../components/ui/Icon/Icon';
import useFetch from '../hooks/useFetch';
import LoadingScreen from '../components/ui/Loading/LoadingScreen';

const SharingHubPage = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar:sharing-hub.title'));
  const params = useParams();
  const calendarId = params.id;
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [calendar, setCalendar] = useState<Calendar | null>(null);

  const { fetchData: getCurrentCalendar, loading: isLoading } = useFetch(
    'GET',
    [`calendars/${calendarId}`]
  );

  useEffect(() => {
    const getCalendar = async () => {
      try {
        const response = await getCurrentCalendar();
        if (response.ok) {
          const data = await response.json();
          setCalendar(data);
        } else {
          console.error('Error fetching calendar');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCalendar();
  }, []);

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!calendar) {
    return <div>Loading calendar data...</div>;
  }

  const calendarUsers = calendar.users;

  return (
    <div>
      <Heading level={1} className="heading--lg clr-primary mb-small">
        {t('calendar:sharing-hub.title')}
      </Heading>
      <p className="mb-large">{t('calendar:sharing-hub.description')}</p>

      <div className={`mb-large`}>
        <Heading level={3} className={`heading heading--sm fw-bold`}>
          <p>{t('calendar:sharing-hub.usersInAgenda')}</p>
        </Heading>

        <ul className={`d-flex align-items-center flex-wrap gap-3`}>
          {calendarUsers &&
            calendarUsers.map((user) => (
              <li key={user.id} className={`calendar-users`}>
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt={`Profile picture of ${user.first_name}`}
                  />
                )}

                {!user.avatar && (
                  <Icon
                    src="/icons/user-profile.svg"
                    alt={`Profile picture of ${user.first_name}`}
                  />
                )}
              </li>
            ))}

          {/* TODO: Add translations */}
          {!calendarUsers && <li>No users in this calendar</li>}

          <li>
            <Button
              className={`btn--primary mx-2`}
              icon={<Icon src="/icons/plus-bright.svg" alt="Plus icon" />}
              // TODO: Add translations
              text={`Invite`}
              isSmall
            />
          </li>
        </ul>
      </div>

      <div className={`mb-large`}>
        <Heading level={3} className={`heading heading--sm fw-bold`}>
          <p>{t('calendar:sharing-hub.exportAgendaAs')}</p>
        </Heading>
        <ActionButtonList
          items={EXPORT_AGENDA_ITEMS}
          functionMap={functionMap}
          className="btn--primary"
        />
      </div>

      <div>
        <Heading level={3} className={`heading heading--sm fw-bold`}>
          <p>{t('calendar:sharing-hub.integrateExternal')}</p>
        </Heading>
        
        <ActionButtonList
          items={EXTERNAL_SERVICES_ITEMS}
          functionMap={functionMap}
          className="btn--primary"
        />
      </div>

      {showExcelModal && calendar && (
        <ExcelExportModal onClose={closeExcelModal} calendar={calendar} />
      )}
    </div>
  );
};

export default SharingHubPage;
