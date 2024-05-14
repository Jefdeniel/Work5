import { useTranslation } from 'react-i18next';
import useSetTitle from '../hooks/setTitle';
import { Row } from 'react-bootstrap';
import Heading from '../components/ui/Heading/Heading';
import Button from '../components/ui/Button/Button';
import IconPlus from '../components/ui/Icon/IconPlus';
import IconProfileImage from '../components/ui/Icon/IconProfileImage';
import IconSlack from '../components/ui/Icon/Logo/IconSlack';
import IconTeams from '../components/ui/Icon/Logo/IconTeams';
import IconApple from '../components/ui/Icon/Logo/IconApple';

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
          <p>{t('calendar:sharing-hub.usersInAgenda')}</p>
        </Heading>

        <ul className={`d-flex align-items-center gap-3`}>
          <li>
            {/* To change */}
            <IconProfileImage />
          </li>

          <li>
            {/* To change */}
            <IconProfileImage />
          </li>

          <li>
            {/* To change */}
            <IconProfileImage />
          </li>

          <li>
            <Button
              className={`btn--primary`}
              text="invite"
              icon={
                <IconPlus pathFill="var(--sa-bright)" width={10} height={10} />
              }
            />
          </li>
        </ul>
      </Row>

      <Row className={`mb-large`}>
        <Heading level={3}>
          <p>{t('calendar:sharing-hub.exportAgendaAs')}</p>
        </Heading>

        <ul className={`d-flex align-items-center gap-3`}>
          <li>
            <Button className={`btn--primary`} text="PDF" />
          </li>

          <li>
            <Button className={`btn--primary`} text="Excel sheet" />
          </li>
        </ul>
      </Row>

      <Row>
        <Heading level={3}>
          <p>{t('calendar:sharing-hub.integrateExternal')}</p>
        </Heading>

        <ul className={`d-flex align-items-center gap-3`}>
          <li>
            <Button
              className={`btn--primary`}
              text="Slack"
              icon={<IconSlack pathFill="var(--sa-bright)" />}
            />
          </li>

          <li>
            <Button
              className={`btn--primary`}
              text="Microsoft Teams"
              icon={<IconTeams pathFill="var(--sa-bright)" />}
            />
          </li>

          <li>
            <Button
              className={`btn--primary`}
              text="Apple Agenda"
              icon={<IconApple pathFill="var(--sa-bright)" />}
            />
          </li>
        </ul>
      </Row>
    </>
  );
};

export default SharingHubPage;
