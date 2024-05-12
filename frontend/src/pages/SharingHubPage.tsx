import { useTranslation } from 'react-i18next';
import useSetTitle from '../hooks/setTitle';
import { Row } from 'react-bootstrap'; 
import Heading from '../components/ui/Heading/Heading';
import Button from '../components/ui/Button/Button';

const SharingHubPage = () => {
  const { t } = useTranslation(['calendar']); 
  useSetTitle(t('calendar:sharing-hub.title'));

  return (
    <> 
      <Row>
        <Heading level={1} className="clr-primary mb-small">
          {t('calendar:sharing-hub.title')} 
        </Heading>
        <p className="mb-large">
          {t('calendar:sharing-hub.description')}
        </p>
      </Row>

      <Row>
        <p>{t('calendar:sharing-hub.usersInAgenda')}</p>
        {/* <Button className="btn--bordered-danger" isBig={false} text="Invite"/> */}
      </Row>

      <Row>
        <p>{t('calendar:sharing-hub.exportAgendaAs')}</p>
      </Row>
      <Row>
        <p>{t('calendar:sharing-hub.integrateExternal')}</p>
      </Row>
    </>
  );
};

export default SharingHubPage;
