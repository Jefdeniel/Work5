import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
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

  return (
    <>
      <Row>
        <Heading level={1} className="clr-primary mb-small">
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
          className="btn--primary"
        />
      </Row>

      <Row className={`mb-large`}>
        <Heading level={3}>
          <p>{t('calendar:sharing-hub.usersInAgenda')}</p>
        </Heading>
      </Row>

      <Row>
        <Heading level={3}>
          <p>{t('calendar:sharing-hub.integrateExternal')}</p>
        </Heading>
        <ActionButtonList
          items={EXTERNAL_SERVICES_ITEMS}
          className="btn--primary"
        />
      </Row>
    </>
  );
};

export default SharingHubPage;
